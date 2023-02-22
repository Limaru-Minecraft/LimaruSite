import { useState } from "react";
import Image from "next/image";

function Tab({ title, content, image }) {
  title = title + " Image";
  return (
    <div className="flex flex-wrap flex-col-reverse sm:flex-nowrap sm:flex-row">
      <div className="sm:w-3/4 pr-4 text-lg">{content}</div>
      <div className="sm:w-1/4">
        <Image className="w-full" src={image} alt={title} />
      </div>
    </div>
  );
}

export default function Tabs({ tabs, italic=false, large=false }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`w-full text-gray-800 p-4 font-semibold border-b-2 rounded-t hover:bg-gray-300
            ${ activeTab === index ? "bg-gray-200" : "bg-white" }
            ${ italic ? "italic" : "" }
            ${ large ? "text-2xl" : "text-xl" }
            `}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.map((tab, index) => (
          <div key={index} className={index === activeTab ? '' : 'hidden'}>
            <Tab title={tab.title} content={tab.content} image={tab.image} />
          </div>
        ))}
      </div>
    </div>
  );
}
