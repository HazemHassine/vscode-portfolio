"use client"

import { useState } from "react"
import {
  VscRefresh,
  VscListSelection,
  VscNewFile,
  VscChevronDown,
  VscChevronRight,
  VscReplaceAll,
  VscCollapseAll,
} from "react-icons/vsc"
import { BsThreeDotsVertical } from "react-icons/bs"

export default function SearchPanel() {
  const [searchTerm, setSearchTerm] = useState("")
  const [replaceTerm, setReplaceTerm] = useState("")
  const [replaceVisible, setReplaceVisible] = useState(true)
  const [matchCase, setMatchCase] = useState(false)
  const [matchWholeWord, setMatchWholeWord] = useState(false)
  const [useRegex, setUseRegex] = useState(false)
  const [preserveCase, setPreserveCase] = useState(false)

  const toggleReplace = () => setReplaceVisible((v) => !v)

  return (
    <div
      className="w-[320px] flex flex-col shrink-0 select-none font-sans text-sm
      bg-[#252526] text-[#cccccc] border-r border-[#2d2d30]"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between h-[35px] px-3
         text-[#cccccc] text-[11px] font-medium uppercase tracking-wide"
      >
        <span>SEARCH</span>
        <div className="flex items-center gap-1">
          <button
            title="Refresh"
            className="p-1 rounded-sm hover:bg-[#37373d] text-[#cccccc] hover:text-white transition-colors"
          >
            <VscRefresh size={16} />
          </button>
          <button
            title="Clear Search Results"
            className="p-1 rounded-sm hover:bg-[#37373d] text-[#cccccc] hover:text-white transition-colors"
          >
            <VscListSelection size={16} />
          </button>
          <button
            title="Open New Search Editor"
            className="p-1 rounded-sm hover:bg-[#37373d] text-[#cccccc] hover:text-white transition-colors"
          >
            <VscNewFile size={16} />
          </button>
          <button
            title="Collapse All"
            className="p-1 rounded-sm hover:bg-[#37373d] text-[#cccccc] hover:text-white transition-colors"
          >
            <VscCollapseAll size={16} />
          </button>
          <button
            title="More Actions..."
            className="p-1 rounded-sm hover:bg-[#37373d] text-[#cccccc] hover:text-white transition-colors"
          >
            <BsThreeDotsVertical size={16} />
          </button>
        </div>
      </div>

      {/* Search Input Container */}
      <div className="p-2 bg-[#252526]">
        {/* Search Row */}
        <div className="flex items-center gap-1 mb-1">
          <button
            onClick={toggleReplace}
            className="p-1 rounded-sm hover:bg-[#37373d] text-[#cccccc] hover:text-white transition-colors flex-shrink-0"
            title="Toggle Replace"
          >
            {replaceVisible ? <VscChevronDown size={16} /> : <VscChevronRight size={16} />}
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[26px] px-3 pr-20 bg-[#3c3c3c] text-[#cccccc] placeholder:text-[#6a6a6a]
                         border border-[#3c3c3c] rounded-sm outline-none 
                         focus:border-[#007acc] focus:bg-[#3c3c3c] transition-colors"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                onClick={() => setMatchCase(!matchCase)}
                className={`w-5 h-5 flex items-center justify-center text-[10px] font-medium rounded-sm transition-colors ${
                  matchCase ? "bg-[#007acc] text-white" : "text-[#cccccc] hover:bg-[#37373d] hover:text-white"
                }`}
                title="Match Case"
              >
                Aa
              </button>
              <button
                onClick={() => setMatchWholeWord(!matchWholeWord)}
                className={`w-5 h-5 flex items-center justify-center text-[10px] font-medium rounded-sm transition-colors ${
                  matchWholeWord ? "bg-[#007acc] text-white" : "text-[#cccccc] hover:bg-[#37373d] hover:text-white"
                }`}
                title="Match Whole Word"
                style={{ textDecoration: matchWholeWord ? "none" : "underline" }}
              >
                ab
              </button>
              <button
                onClick={() => setUseRegex(!useRegex)}
                className={`w-5 h-5 flex items-center justify-center text-[10px] font-medium rounded-sm transition-colors ${
                  useRegex ? "bg-[#007acc] text-white" : "text-[#cccccc] hover:bg-[#37373d] hover:text-white"
                }`}
                title="Use Regular Expression"
              >
                .*
              </button>
            </div>
          </div>
        </div>

        {/* Replace Row */}
        {replaceVisible && (
          <div className="flex items-center gap-1">
            <div className="w-[26px]" /> {/* Spacer for alignment */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Replace"
                value={replaceTerm}
                onChange={(e) => setReplaceTerm(e.target.value)}
                className="w-full h-[26px] px-3 pr-24 bg-[#3c3c3c] text-[#cccccc] placeholder:text-[#6a6a6a]
                           border border-[#3c3c3c] rounded-sm outline-none 
                           focus:border-[#007acc] focus:bg-[#3c3c3c] transition-colors"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  onClick={() => setPreserveCase(!preserveCase)}
                  className={`w-5 h-5 flex items-center justify-center text-[10px] font-medium rounded-sm transition-colors ${
                    preserveCase ? "bg-[#007acc] text-white" : "text-[#cccccc] hover:bg-[#37373d] hover:text-white"
                  }`}
                  title="Preserve Case"
                >
                  AB
                </button>
                <button
                  className="w-5 h-5 flex items-center justify-center rounded-sm hover:bg-[#37373d] text-[#cccccc] hover:text-white transition-colors"
                  title="Replace All"
                >
                  <VscReplaceAll size={12} />
                </button>
                <button
                  title="More Actions..."
                  className="w-5 h-5 flex items-center justify-center rounded-sm hover:bg-[#37373d] text-[#cccccc] hover:text-white transition-colors"
                >
                  <BsThreeDotsVertical size={12} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Area */}
      <div className="flex-1 bg-[#252526] p-2">
        <div className="text-[#6a6a6a] text-xs ml-1">
          {searchTerm ? `No results found for "${searchTerm}"` : "Search for text in your workspace"}
        </div>
      </div>
    </div>
  )
}
