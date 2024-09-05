import React from 'react';
import { Modal } from 'flowbite-react';

const AddReminderModal = ({ isOpen, onClose }) => {
  return (
    <Modal show={isOpen} size="md" onClose={onClose}>
      <Modal.Header>Add a Reminder</Modal.Header>
      <Modal.Body>
        <form>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Reminder Title
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Enter reminder title"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddReminderModal;
