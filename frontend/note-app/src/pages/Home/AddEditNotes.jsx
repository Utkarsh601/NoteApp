import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // Add new note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", { title, content, tags });

      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit note
  const editNote = async () => {
    const noteID = noteData._id;
    try {
      const response = await axiosInstance.put(`/edit-note/${noteID}`, { title, content, tags });
      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = async () => {
    if (!title) {
      setError("Please Enter the Title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");
    type === "edit" ? editNote() : addNewNote();
  };

  return (
    <div className="relative max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center absolute -top-3 -right-3 bg-gray-200 hover:bg-gray-300"
        onClick={onClose}
      >
        <MdClose className="text-xl text-gray-600" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">TITLE</label>
        <input
          type="text"
          className="w-full text-xl text-gray-700 outline-none border border-gray-300 rounded-md p-2"
          placeholder="Go to Gym At 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-sm font-medium text-gray-700">CONTENT</label>
        <textarea
          className="w-full text-sm text-gray-800 outline-none border border-gray-300 bg-gray-100 p-2 rounded-md"
          placeholder="Content"
          rows={6}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="text-sm font-medium text-gray-700">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="w-full btn-primary font-medium mt-5 p-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
