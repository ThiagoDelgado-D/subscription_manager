
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { FilterPanel } from "@/components/FilterPanel";
import { SearchBar } from "@/components/SearchBar";
import { ChannelCard } from "@/components/ChannelCard";
import { mockChannels } from "@/lib/mockData";
import { Channel, FilterOptions } from "@/lib/types";

const Index = () => {
  const { toast } = useToast();
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterOptions>({
    category: null,
    postFrequency: null,
    searchQuery: "",
  });

  const filteredChannels = useMemo(() => {
    return mockChannels.filter((channel) => {
      const matchesCategory = !filters.category || channel.category === filters.category;
      const matchesFrequency = !filters.postFrequency || channel.postFrequency === filters.postFrequency;
      const matchesSearch = !filters.searchQuery || 
        channel.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        channel.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      return matchesCategory && matchesFrequency && matchesSearch;
    });
  }, [filters]);

  const handleSelect = (channelId: string) => {
    setSelectedChannels((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(channelId)) {
        newSet.delete(channelId);
      } else {
        newSet.add(channelId);
      }
      return newSet;
    });
  };

  const handleBulkUnsubscribe = () => {
    if (selectedChannels.size === 0) {
      toast({
        title: "No channels selected",
        description: "Please select at least one channel to unsubscribe",
      });
      return;
    }

    toast({
      title: "Unsubscribed successfully",
      description: `Unsubscribed from ${selectedChannels.size} channels`,
    });
    setSelectedChannels(new Set());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-2">YouTube Subscription Manager</h1>
          <p className="text-gray-600 text-center mb-8">
            Organize and manage your YouTube subscriptions efficiently
          </p>
        </motion.div>

        <SearchBar
          value={filters.searchQuery}
          onChange={(value) => setFilters({ ...filters, searchQuery: value })}
        />

        <FilterPanel filters={filters} onFilterChange={setFilters} />

        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">
            {filteredChannels.length} channels found
          </p>
          {selectedChannels.size > 0 && (
            <Button
              onClick={handleBulkUnsubscribe}
              variant="destructive"
              className="transition-all duration-200"
            >
              Unsubscribe from {selectedChannels.size} channels
            </Button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {filteredChannels.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              onSelect={handleSelect}
              isSelected={selectedChannels.has(channel.id)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
