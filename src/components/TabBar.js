import React from 'react';
import TabItem from './TabItem';

const TabBar = ({ tabs, activeTab, onTabClick, onTabClose }) => {
  return (
    <div className="flex bg-[var(--vscode-tab-bar-background)] overflow-x-auto h-[40px] shrink-0">
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
