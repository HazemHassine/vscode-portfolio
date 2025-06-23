import React from "react";
import {
  VscSearch,
  VscFiles,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
  VscAccount,
  VscSettingsGear,
} from "react-icons/vsc";

const ActivityBar = () => {
  // Helper for icon with optional badge
  const IconWithBadge = ({ icon: Icon, badge }) => (
    <div className="relative group cursor-pointer p-2 hover:bg-[#333]">
      <Icon className="text-gray-400 group-hover:text-white" size={24} />
      {badge && (
        <span className="absolute top-1 right-1 bg-[#0078d4] text-xs rounded-full px-1 leading-none text-white font-semibold select-none">
          {badge}
        </span>
      )}
    </div>
  );

  return (
    <aside className="flex flex-col justify-between bg-[#1e1e1e] w-14 py-2 select-none">
      <div className="flex flex-col space-y-1">
        <IconWithBadge icon={VscSearch} />
        <IconWithBadge icon={VscFiles} />
        <IconWithBadge icon={VscSourceControl} badge={9} />
        <IconWithBadge icon={VscDebugAlt} />
        <IconWithBadge icon={VscExtensions} badge={1} />
        <IconWithBadge icon={VscFiles} />
      </div>

      <div className="flex flex-col space-y-1">
        <IconWithBadge icon={VscAccount} />
        <IconWithBadge icon={VscSettingsGear} badge={1} />
      </div>
    </aside>
  );
};

export default ActivityBar;
