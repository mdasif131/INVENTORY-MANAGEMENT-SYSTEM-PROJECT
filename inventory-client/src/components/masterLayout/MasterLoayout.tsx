import {
  BadgeCheck,
  Hourglass,
  LayersPlus,
  LayoutDashboard,
  NotebookPen,
  PanelLeftClose,
  SlidersHorizontal,
  SquareMenu,
  SquareX,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import MyDropDown from './MyDropDown';

const SidebarVariants = {
  open: { x: 0, opacity: 1, scale: 1 },
  closed: { x: '-100%', opacity: 0 },
};
const containerVariants = {
  open: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0,
    },
  },
};
const itemVariants = {
  open: { opacity: 1, y: 0, scale: 1 },
  closed: { opacity: 0, y: -20, scale: 0.95 },
};
const MasterLoayout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

 
  return (
    <section className="w-full mx-auto  z-100000">
      {/* Nav bar  */}
      <div>
        <nav className="w-full  px-4 md:px-8 py-4 bg-white shadow-lg ">
          <div className="flex items-center justify-between">
            {/* step 01 */}
            <div className="inline-flex items-center gap-4">
              <button onClick={() => setIsOpen(!isOpen)}>
                <SlidersHorizontal className="text-2xl text-gray-900" />
              </button>
              <div className="inline-flex items-center gap-2">
                <SquareMenu className="text-purple-500" />{' '}
                <h1 className="text-2xl text-gray-900 font-bold">
                  Task Manager
                </h1>
              </div>
            </div>
            {/* step 2 */}
            <MyDropDown />
          </div>
        </nav>
      </div>

      <div className="mx-auto grid w-full grid-cols-12 border-t-2 relative">
        {/* Sidebar  */}
        <motion.div
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={SidebarVariants}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={` max-sm:absolute left-0 top-0 max-sm:min-w-75 ${
            isOpen ? 'col-span-2  bg-white min-h-screen' : 'hidden'
          }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden max-sm:block p-2 ml-auto mr-4"
          >
            <PanelLeftClose className="text-2xl text-purple-500 " />
          </button>
          <motion.div
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            variants={containerVariants}
            className="w-full  mx-auto py-5 flex flex-col space-y-2"
          >
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                `p-4 ${
                  isActive
                    ? 'bg-purple-500/30 border-l-4 border-purple-500'
                    : ' '
                }`
              }
            >
              <motion.div
                variants={itemVariants}
                className="text-gray-900 inline-flex items-center gap-3 "
              >
                <LayoutDashboard size={24} />
                <h3 className="text-xl font-serif">Dashboard</h3>
              </motion.div>
            </NavLink>

            <NavLink
              to={'/create'}
              className={({ isActive }) =>
                `p-4 ${
                  isActive
                    ? 'bg-purple-500/30 border-l-4 border-purple-500'
                    : ' '
                }`
              }
            >
              <motion.div
                variants={itemVariants}
                className="text-gray-900 inline-flex items-center gap-3"
              >
                <NotebookPen size={24} />
                <h3 className="text-xl font-serif">Create New</h3>
              </motion.div>
            </NavLink>

            <NavLink
              to={'/all'}
              className={({ isActive }) =>
                `p-4 ${
                  isActive
                    ? 'bg-purple-500/30 border-l-4 border-purple-500'
                    : ' '
                }`
              }
            >
              <motion.div
                variants={itemVariants}
                className="text-gray-900 inline-flex items-center gap-3"
              >
                <LayersPlus size={24} />
                <h3 className="text-xl font-serif">New Task</h3>
              </motion.div>
            </NavLink>

            <NavLink
              to={'/progress'}
              className={({ isActive }) =>
                `p-4 ${
                  isActive
                    ? 'bg-purple-500/30 border-l-4 border-purple-500'
                    : ' '
                }`
              }
            >
              <motion.div
                variants={itemVariants}
                className="text-gray-900 inline-flex items-center gap-3"
              >
                <Hourglass size={24} />
                <h3 className="text-xl font-serif">In Progress</h3>
              </motion.div>
            </NavLink>

            <NavLink
              to={'/completed'}
              className={({ isActive }) =>
                `p-4 ${
                  isActive
                    ? 'bg-purple-500/30 border-l-4 border-purple-500'
                    : ' '
                }`
              }
            >
              <motion.div
                variants={itemVariants}
                className="text-gray-900 inline-flex items-center gap-3"
              >
                <BadgeCheck size={24} />
                <h3 className="text-xl font-serif">Completed</h3>
              </motion.div>
            </NavLink>

            <NavLink
              to={'/canceled'}
              className={({ isActive }) =>
                `p-4  ${
                  isActive
                    ? 'bg-purple-500/30 border-l-4 border-purple-500'
                    : ' '
                }`
              }
            >
              <motion.div
                variants={itemVariants}
                className="text-gray-900 inline-flex items-center gap-3"
              >
                <SquareX size={24} />
                <h3 className="text-xl font-serif">Canceled</h3>
              </motion.div>
            </NavLink>
          </motion.div>
        </motion.div>

        {/* Content  */}
        <div
          className={`w-full mx-auto py-8 px-4!  ${
            isOpen ? 'col-span-10' : 'col-span-12 w-full '
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default MasterLoayout;
