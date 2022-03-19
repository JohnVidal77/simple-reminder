import { useRef } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Modal, IModalRef } from '../Modal';
import { CreateReminderForm } from './CreateReminderForm';

export const RemidersList = () => {
  const modalRef = useRef<IModalRef>(null);

  return (
    <>
      <div className="px-4 h-full pb-20 md:pb-12 overflow-y-auto">
        <Button
          type="button"
          onClick={() => modalRef.current?.toggle()}
          modileFixedBottom
        >
          Create remider
        </Button>
        <ul className="mt-2">
          <li className="mb-2 last:mb-0">
            <div className="w-full h-28 p-4 text-white bg-purple-600 flex flex-col justify-between rounded-md">
              <div>
                <span className="block font-medium opacity-95">Remider 1</span>
                <span className="block text-sm opacity-75">
                  13/02/2022 - 15:30
                </span>
              </div>
              <div className="flex justify-end gap-2">
                <IconButton icon={MdEdit} size="1.5rem" />
                <IconButton icon={MdDelete} size="1.5rem" />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <Modal title="Create a new reminder" ref={modalRef}>
        <CreateReminderForm />
      </Modal>
    </>
  );
};
