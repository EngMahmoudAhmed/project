import React from 'react';
import { X, User } from 'lucide-react';
import { getProfile } from '../../lib/profile';
import toast from 'react-hot-toast';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [profile, setProfile] = React.useState<{ full_name?: string, email?: string } | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadProfile() {
      if (!isOpen) return;
      
      try {
        setLoading(true);
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (error: any) {
        toast.error('Error loading profile');
      } finally {
        setLoading(false);
      }
    }
    
    loadProfile();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 rounded-full p-4">
                  <User className="h-16 w-16 text-gray-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <p className="mt-1 text-gray-900">{profile?.full_name || 'Not set'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-gray-900">{profile?.email}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}