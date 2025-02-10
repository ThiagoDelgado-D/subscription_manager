import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { FilterPanel } from "@/components/FilterPanel";
import { SearchBar } from "@/components/SearchBar";
import { ChannelCard } from "@/components/ChannelCard";
import { mockChannels } from "@/lib/mockData";
import { FilterOptions } from "@/lib/types";
import { GoogleLogin } from '@react-oauth/google';
import { fetchSubscriptions } from "@/services/youtube-service";

const Index = () => {
  const { toast } = useToast();
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set());
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    category: null,
    postFrequency: null,
    searchQuery: "",
  });

  useEffect(() => {
    const getSubscriptions = async () => {
      if (accessToken) {
        try {
          const subscriptions = await fetchSubscriptions(accessToken);
          console.log('Fetched subscriptions:', subscriptions);
          
          // Log formatted subscriptions
          const formattedChannels = subscriptions?.map((sub: any) => ({
            id: sub.id,
            name: sub.snippet.title,
            description: sub.snippet.description,
            subscriberCount: 0,
            videoCount: 0,
            thumbnailUrl: sub.snippet.thumbnails.default.url,
            category: 'Uncategorized',
            lastVideoDate: sub.snippet.publishedAt,
            postFrequency: 'medium' as const,
          }));
          console.log('Formatted channels:', formattedChannels);
          
        } catch (error) {
          console.error('Error in getSubscriptions:', error);
          toast({
            title: "Error fetching subscriptions",
            description: "Could not fetch your YouTube subscriptions. Please try again.",
            variant: "destructive",
          });
        }
      }
    };

    getSubscriptions();
  }, [accessToken, toast]);

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

  const renderContent = () => {
    if (!accessToken) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-semibold mb-6">Sign in with Google to manage your subscriptions</h2>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log('Login response:', credentialResponse);
              setAccessToken(credentialResponse.credential);
              toast({
                title: "Login successful",
                description: "You can now manage your YouTube subscriptions",
              });
            }}
            onError={() => {
              toast({
                title: "Login failed",
                description: "Please try again",
                variant: "destructive",
              });
            }}
          />
        </div>
      );
    }

    return (
      <>
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
      </>
    );
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

        {renderContent()}
      </div>
    </div>
  );
};

export default Index;