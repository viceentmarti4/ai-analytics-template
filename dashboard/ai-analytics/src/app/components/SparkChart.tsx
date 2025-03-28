'use client';

import {
    Card,
    SparkAreaChart,
    LineChart,
    BarChart,
    AreaChart,
  } from '@tremor/react';

  // Default colors for all categories
  const defaultColors = ['#27F795', '#3CCC70', '#40A25F', '#34836E', '#2B6D5C'];

  type ChartType = 'area' | 'line' | 'bar' | 'stacked-bar' | 'stacked-area';

  interface SparkChartProps {
    data: Array<{
      date: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    }>;
    categories: string[];
    chartType?: ChartType;
    title: string;
    value: string;
  }

  export default function SparkChart({ 
    data,
    categories,
    chartType = 'line',
    title,
    value
  }: SparkChartProps) {
    const ChartComponent = {
      'stacked-bar': BarChart,
      'stacked-area': AreaChart,
      'area': SparkAreaChart,
      'line': LineChart,
      'bar': BarChart
    }[chartType];

    const isStacked = chartType.startsWith('stacked-');

    // Assign colors based on index in the categories array
    const colors = categories.map((_, index) => 
      defaultColors[index % defaultColors.length]
    );

    return (
      <Card className="h-full w-full rounded-none" style={{ boxShadow: 'none' }}>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content" style={{ fontFamily: 'var(--font-family-base)' }}>
          {title}
        </p>
        <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong pt-[6px]">
          {value}
        </p>
        <div className="mt-[20px]">
          <ChartComponent
            data={data}
            index="date"
            categories={categories}
            showGradient={true}
            colors={colors}
            className="h-28 w-full"
            showXAxis={true}
            showYAxis={true}
            showLegend={false}
            showGridLines={true}
            showAnimation={false}
            curveType="monotone"
            stack={isStacked}
          />
        </div>
      </Card>
    );
  }