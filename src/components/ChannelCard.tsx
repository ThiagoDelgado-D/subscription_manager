
import { Channel } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ChannelCardProps {
  channel: Channel;
  onSelect: (channelId: string) => void;
  isSelected: boolean;
}

export const ChannelCard = ({ channel, onSelect, isSelected }: ChannelCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300 group">
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelect(channel.id)}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">{channel.name}</h3>
            <div className="flex space-x-2">
              <Badge variant="secondary">{channel.category}</Badge>
              <Badge 
                variant="outline" 
                className={
                  channel.postFrequency === 'high' 
                    ? 'bg-green-100' 
                    : channel.postFrequency === 'medium' 
                    ? 'bg-yellow-100' 
                    : 'bg-red-100'
                }
              >
                {channel.postFrequency} activity
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-2">{channel.description}</p>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{channel.subscriberCount.toLocaleString()} subscribers</span>
            <span>{channel.videoCount} videos</span>
            <span>Last video: {new Date(channel.lastVideoDate).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
