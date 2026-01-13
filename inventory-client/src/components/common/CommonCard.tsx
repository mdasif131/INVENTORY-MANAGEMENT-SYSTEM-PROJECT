import { Calendar, PencilLine, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
interface CommonCardProps {
  updateStatus: () => void;
  deleteTask: () => void;
  title: string;
  description: string;
  status?: string;
  createDate?: string;
  variant: 'default' | 'destructive' | 'greenbtn' | 'skybtn' | 'newtaskbtn';
}

const CommonCard: React.FC<CommonCardProps> = ({updateStatus,deleteTask, title, description,createDate,status, variant }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Card className="w-full">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <CardTitle>{title}</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {description}
            </motion.div>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="inline-flex items-center gap-2 text-sm sm:text-[16px]">
                <Calendar size={18} />
                <span>{createDate}</span>
              </div>
              <button onClick={updateStatus} className="text-red-400">
                <PencilLine size={18} />
              </button>
              <button onClick={deleteTask} className="ml-2 text-red-400">
                <Trash2 size={18} />
              </button>
            </div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <Button  variant={variant} className='max-sm:px-2 max-sm:ml-2'>{status}</Button>
            </motion.div>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CommonCard;
