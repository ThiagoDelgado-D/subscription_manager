
import { categories } from "@/lib/mockData";
import { FilterOptions } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: FilterOptions) => void;
}

export const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={filters.category === category ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      onFilterChange({
                        ...filters,
                        category: filters.category === category ? null : category,
                      })
                    }
                    className="transition-all duration-200"
                  >
                    {category}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Post Frequency</h3>
            <div className="flex gap-2">
              {["high", "medium", "low"].map((freq) => (
                <motion.div
                  key={freq}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={filters.postFrequency === freq ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      onFilterChange({
                        ...filters,
                        postFrequency:
                          filters.postFrequency === freq ? null : freq,
                      })
                    }
                    className="capitalize transition-all duration-200"
                  >
                    {freq}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
