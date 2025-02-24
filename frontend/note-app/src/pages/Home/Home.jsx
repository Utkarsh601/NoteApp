import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: 'add',
        data: null,
    });
    const [userInfo, setUserInfo] = useState(null);
    const [notes, setAllNotes] = useState([]);
    const [searchNote, setSearchNote] = useState(false);
    const [shownToastMessage, isShownToastMessage] = useState({
        isShown: false,
        message: '',
        type: '',
    });

    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({ isShown: true, data: noteDetails, type: 'edit' });
    };

    const handleCloseToast = () => {
        isShownToastMessage({ isShown: false, message: '', type: '' });
    };

    const showToastMessage = (message, type) => {
        isShownToastMessage({ isShown: true, message, type });
    };

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get('/get-user');
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        }
    };

    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get('/get-all-notes');
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log('An unexpected error occurred. Please try again.');
        }
    };

    const deleteNotes = async (data) => {
        const noteID = data._id;
        try {
            const response = await axiosInstance.delete(`/delete-note/${noteID}`);
            if (response.data && !response.data.error) {
                showToastMessage('Note Deleted Successfully', 'delete');
                getAllNotes();
            }
        } catch (error) {
            console.log('An unexpected error occurred. Please try again.');
        }
    };

    const searchingNotes = async (query) => {
        try {
            const response = await axiosInstance.get('/search-note/', { params: { query } });
            if (response.data && response.data.notes) {
                setSearchNote(true);
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateisPinned = async (data) => {
        const noteId = data._id;
        try {
            const response = await axiosInstance.put(`/update-note-pinned/${noteId}`, { isPinned: !data.isPinned });
            if (response.data && response.data.note) {
                showToastMessage(data.isPinned ? 'Note Unpinned successfully' : 'Note Pinned successfully');
                getAllNotes();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClearSearch = () => {
        setSearchNote(false);
        getAllNotes();
    };

    useEffect(() => {
        getAllNotes();
        getUserInfo();
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo} searchingNotes={searchingNotes} handleClearSearch={handleClearSearch} />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {notes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                        {notes.map((item) => (
                            <NoteCard
                                key={item._id}
                                title={item.title}
                                date={item.createdOn}
                                tags={item.tags}
                                content={item.content}
                                isPinned={item.isPinned}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => deleteNotes(item)}
                                onPinNote={() => updateisPinned(item)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-64 sm:h-80 md:h-96 text-xl font-semibold text-gray-600 text-center">
                        Start by adding a new note 🚀
                    </div>
                )}
            </div>

            {/* Floating Button */}
            <button
                className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg fixed bottom-6 right-6 sm:bottom-10 sm:right-10"
                onClick={() => setOpenAddEditModal({ isShown: true, type: 'add', data: null })}
            >
                <MdAdd className="text-[28px] sm:text-[32px] text-white" />
            </button>

            {/* Modal */}
            <Modal
                ariaHideApp={false}
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => setOpenAddEditModal({ isShown: false, type: 'add', data: null })}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    },
                }}
                contentLabel=""
                className="w-[90%] sm:w-[75%] md:w-[50%] lg:w-[40%] max-h-[80vh] bg-white rounded-md mx-auto mt-10 p-5 overflow-auto"
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => setOpenAddEditModal({ isShown: false, type: 'add', data: null })}
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                />
            </Modal>

            {/* Toast */}
            <Toast isShown={shownToastMessage.isShown} message={shownToastMessage.message} type={shownToastMessage.type} onClose={handleCloseToast} />
        </>
    );
};

export default Home;
