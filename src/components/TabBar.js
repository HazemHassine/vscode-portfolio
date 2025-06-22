import React from 'react';
import TabItem from './TabItem';

const TabBar = ({ tabs, activeTab, onTabClick, onTabClose }) => {
  return (
    <div className="flex bg-[#252526] border-b border-gray-700 overflow-x-auto">
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          title={tab.title}
          icon={tab.icon}
          isActive={tab.id === activeTab}
          onClick={() => onTabClick(tab.id)}
          onClose={() => onTabClose(tab.id)}
        />
      ))}
    </div>
  );
};

export default TabBar;
