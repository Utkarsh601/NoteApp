import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment';

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  return (
    <div className='border rounded-lg p-4 bg-white hover:shadow-xl transition-all w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl'>
      <div className='flex items-center justify-between'>
        <div>
          <h6 className='text-sm md:text-base font-medium'>{title}</h6>
          <span className='text-xs md:text-sm text-slate-500'>{moment(date).format("DD MMMM YYYY")}</span>
        </div>
        <MdOutlinePushPin 
          className={`text-xl md:text-2xl cursor-pointer ${isPinned ? 'text-blue-500' : 'text-slate-300'}`} 
          onClick={onPinNote} 
        />
      </div>

      <p className='text-xs md:text-sm text-slate-600 mt-2 line-clamp-2'>
        {content?.slice(0, 60)}...
      </p>

      <div className='flex items-center justify-between mt-2'>
        <div className='text-xs md:text-sm text-slate-500 flex flex-wrap gap-1'>
          {tags.map((tag, index) => (
            <span key={index} className="text-blue-500">#{tag}</span>
          ))}
        </div>

        <div className='flex items-center gap-2'>
          <MdCreate 
            className='text-lg md:text-xl cursor-pointer hover:text-green-600' 
            onClick={onEdit} 
          />
          <MdDelete 
            className='text-lg md:text-xl cursor-pointer hover:text-red-600' 
            onClick={onDelete} 
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
