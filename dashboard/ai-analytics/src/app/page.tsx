'use client';

import TopBar from './components/TopBar';
import TimeseriesChartContainer from './containers/TimeseriesChartContainer';
import MetricsCards from './components/MetricsCards';
import DataTableContainer from './containers/DataTableContainer';
import TabbedPane from './components/TabbedPane';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { tabs } from './constants';

interface Selection {
  dimension: string;
  dimensionName: string;
  values: string[];
}

export default function Dashboard() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selections, setSelections] = useState<Selection[]>([]);
  const searchParams = useSearchParams();

  // Initialize selections from URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const newSelections: Selection[] = [];
    const newFilters: Record<string, string> = {};

    // Check each possible dimension from tabs
    tabs.forEach(tab => {
      const values = params.get(tab.key)?.split(',') || [];
      if (values.length > 0) {
        newSelections.push({
          dimension: tab.key,
          dimensionName: tab.name,
          values
        });
        newFilters[tab.key] = values.join(',');
      }
    });

    setSelections(newSelections);
    setFilters(newFilters);
  }, [searchParams]);

  const handleFilterUpdate = (dimension: string, dimensionName: string, values: string[]) => {
    setSelections(prev => {
      const otherSelections = prev.filter(s => s.dimension !== dimension);
      return values.length > 0 
        ? [...otherSelections, { dimension, dimensionName, values }]
        : otherSelections;
    });

    setFilters(prev => {
      const newFilters = { ...prev };
      if (values.length > 0) {
        newFilters[dimension] = values.join(',');
      } else {
        delete newFilters[dimension];
      }
      return newFilters;
    });
  };

  const handleRemoveFilter = (dimension: string, value: string) => {
    setSelections(prev => {
      const newSelections = prev.map(selection => {
        if (selection.dimension === dimension) {
          const newValues = selection.values.filter(v => v !== value);
          if (newValues.length === 0) return null;
          return { ...selection, values: newValues };
        }
        return selection;
      }).filter((s): s is Selection => s !== null);

      setFilters(prev => {
        const newFilters = { ...prev };
        const selection = newSelections.find(s => s.dimension === dimension);
        if (selection) {
          newFilters[dimension] = selection.values.join(',');
        } else {
          delete newFilters[dimension];
        }
        return newFilters;
      });

      return newSelections;
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <TopBar
        selections={selections}
        onRemoveFilter={handleRemoveFilter}
      />
      
      <main className="flex-1 flex min-h-0">
        {/* Main Content - 2/3 width */}
        <div className="w-2/3 flex flex-col min-h-0">
          <div className="h-[60vh] border-b border-r border-gray-700">
            <TimeseriesChartContainer filters={filters} />
          </div>
          <div className="h-[35vh] border-r border-gray-700 overflow-hidden">
            <DataTableContainer filters={filters} />
          </div>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="w-1/3 overflow-auto">
          <div className="border-b border-gray-700">
            <MetricsCards filters={filters} />
          </div>
          <div>
            <TabbedPane 
              filters={filters}
              onFilterUpdate={handleFilterUpdate} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}