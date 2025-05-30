import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { setDeleteModal, setPageTitle, setLoader } from '../../slices/sharedSlice';
import { useLanguage } from '../../shared/hooks/LanguageContext';
import { socialCrud } from './Cms-Service';
import AddEditSocialMedia from './components/AddEditSocialMedia';
import DeleteModal from '../../shared/DeleteModal';
import PageLoader from '../../shared/PageLoader'; 

const SocialMedia = () => {
  const [socialData, setSocialData] = useState([]);
  const { language } = useLanguage();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('add');
  const [editingItem, setEditingItem] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  const pageTitle = language === 'ar' ? 'وسائل التواصل الاجتماعي' : 'Social Media';

  const fetchSocialMedia = async () => {
    setIsLoading(true); 
    try {
      const response = await socialCrud.fetch();
      if (response.status && response.data?.data?.length >= 0) {
        setSocialData(response.data.data);
      } else {
        enqueueSnackbar('Failed to load social media data', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Failed to fetch Social Media data', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchSocialMedia();
    dispatch(setPageTitle(pageTitle));
  }, [language, refreshFlag]);

  const handleOpen = () => {
    setMode('add');
    setEditingItem(null);
    setOpen(true);
  };

  const handleEdit = (item) => {
    setMode('edit');
    setEditingItem(item);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    dispatch(setDeleteModal(true));
  };

  const handleDelete = () => {
    if (!deleteId) return;
    dispatch(setLoader(true));
    socialCrud.delete(deleteId)
      .then((response) => {
        if (response.data.success) {
          dispatch(setDeleteModal(false));
          enqueueSnackbar(response?.data?.message, {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        } else {
          enqueueSnackbar('Failed to delete item.', { variant: 'error' });
        }
      })
      .catch((error) => {
        console.error("Error deleting social media:", error);
      })
      .finally(() => {
        dispatch(setLoader(false));
        setDeleteId(null);
        fetchSocialMedia();
      });
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
  };

  const getResponseBack = () => {
    setRefreshFlag((prev) => !prev);
    setOpen(false);
    setEditingItem(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-normal">{pageTitle}</h4>
          <p className="font-light">Displaying all the Social Media Links</p>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleOpen}
            className="flex items-center gap-2 text-white bg-[#2952FF] px-4 py-2 rounded-full border border-gray-300 min-w-[110px] cursor-pointer hover:bg-[#1c40ff]"
          >
            <img src="/src/assets/create.svg" alt="Add Social Media" className="w-5 h-5" />
            <div className="text-sm font-normal">Add Social Media</div>
          </button>
        </div>
      </div>

      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="flex flex-wrap gap-6 p-5">
          {socialData.length === 0 ? (
            <p>No social media links found.</p>
          ) : (
            socialData.map((item) => (
              <div
                key={item.id}
                className="relative w-[200px] border border-gray-300 rounded-lg overflow-hidden shadow-md"
              >
                <div className="absolute z-10 flex gap-2 top-2 right-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="relative cursor-pointer"
                    aria-label="Edit social media"
                  >
                    <img src="/src/assets/round.png" alt="" className="w-8 h-8" />
                    <img
                      src="/src/assets/edit.svg"
                      alt="Edit"
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    className="relative cursor-pointer"
                    aria-label="Delete social media"
                  >
                    <img src="/src/assets/round.png" alt="" className="w-8 h-8" />
                    <img
                      src="/src/assets/delete.svg"
                      alt="Delete"
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    />
                  </button>
                </div>

                <a
                  href={item.link?.startsWith('http') ? item.link : `https://${item.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center no-underline"
                >
                  <img
                    src={item.image || 'https://placehold.co/200x180?text=No+Image'}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/200x180?text=No+Image';
                    }}
                    alt="Social media preview"
                    className="w-full h-[180px] object-cover"
                  />
                  <div className="px-2 py-1 overflow-hidden text-base font-medium text-slate-800 whitespace-nowrap text-ellipsis">
                    {item.link?.startsWith('http')
                      ? new URL(item.link).hostname.replace('www.', '')
                      : item.link}
                  </div>
                </a>
              </div>
            ))
          )}
        </div>
      )}

      <AddEditSocialMedia
        open={open}
        onClose={handleClose}
        mode={mode}
        editingItem={editingItem}
        getResponseBack={getResponseBack}
      />
      <DeleteModal handleDelete={handleDelete} />
    </div>
  );
};

export default SocialMedia;
