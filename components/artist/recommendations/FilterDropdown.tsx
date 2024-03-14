import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { dropdownData } from "../../icons/Helper";
import { FilterDropDownIcon } from "../../icons/Icons";

export default function FilterDropdown() {
  return (
    <div className="p-3">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex w-[116px] h-[46px] justify-center gap-5 items-start rounded-[4px] bg-[#EAEAEA] px-5 text-black text-sm font-inter font-normal leading-normal text-center py-[14px]">
            Filter
            <span className="pt-1.5">
              <FilterDropDownIcon />
            </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute w-full right-0 mt-2 origin-top-right rounded-md bg-[#EAEAEA] shadow-xl p-1">
            <div className="flex flex-col gap-px">
              {dropdownData.map((items, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-white" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-black`}
                    >
                      {items.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
