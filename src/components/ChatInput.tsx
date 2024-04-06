import { Badge, Button, Input } from "antd";
import { Edit, PlusCircle } from "react-feather";

interface IProps {
  value: string;
  setValue: (value: string) => void;
  toggleModal: () => void;
  websiteUrl: string | null;
  onSubmit: () => void;
}

const ChatInput = ({
  toggleModal,
  websiteUrl,
  onSubmit,
  value,
  setValue,
}: IProps) => {
  return (
    <div className="w-[60%]">
      <div className="border-2 border-gray-300 rounded-md p-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-2 py-4  border-0 outline-none rounded-lg "
          type="text"
          placeholder="Describe what to scrape..."
        />
        <div className="flex justify-between gap-2 w-full">
          {websiteUrl ? (
            <div className="px-2 py-1 w-fit flex gap-2 rounded-lg mb-1">
              <a
                href={websiteUrl}
                className="text-blue underline"
                title={websiteUrl}
              >
                {websiteUrl}
              </a>
              <button onClick={toggleModal}>
                <Edit className="w-6 h-6 text-gray-500 hover:text-gray-700 active:text-gray-900" />
              </button>
            </div>
          ) : (
            <button
              className="flex items-center gap-2"
              title="Add website"
              onClick={toggleModal}
            >
              <PlusCircle className="w-8 h-8 text-gray-500 hover:text-gray-700 active:text-gray-900" />
              Add website
            </button>
          )}

          <Button
            className=""
            type="primary"
            onClick={onSubmit}
            disabled={!websiteUrl}
          >
            Retrieve
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
