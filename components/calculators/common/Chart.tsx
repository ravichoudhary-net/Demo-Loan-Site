import React from 'react';

type ChartDataPoint = { [key: string]: string | number };
type ChartType = 'pie' | 'area' | 'bar' | 'line';

interface ChartProps {
  type: ChartType;
  data: any[];
  config?: any;
}

const Chart: React.FC<ChartProps> = ({ type, data, config }) => {
    if (!data || data.length === 0) {
        return <div className="text-center text-gray-500 py-10">No data to display.</div>;
    }

    switch (type) {
        case 'pie':
            return <PieChart data={data} />;
        case 'area':
            return <AreaChart data={data} config={config} />;
        case 'bar':
            return <BarChart data={data} config={config} />;
        case 'line':
            return <LineChart data={data} config={config} />;
        default:
            return <div className="text-center text-red-500 py-10">Invalid chart type.</div>;
    }
};

const PieChart: React.FC<{data: {name: string, value: number, color: string}[]}> = ({data}) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return <div className="flex items-center justify-center h-40">Enter values to see chart.</div>;

    let cumulativePercent = 0;

    return (
        <div className="relative w-40 h-40 mx-auto">
            <svg viewBox="0 0 36 36" className="w-full h-full">
                 {data.map((item) => {
                    const percent = (item.value / total) * 100;
                    const dashArray = `${percent} ${100 - percent}`;
                    const offset = 25 - cumulativePercent;
                    cumulativePercent += percent;
                    return (
                        <circle
                            key={item.name}
                            cx="18" cy="18" r="15.915"
                            fill="transparent"
                            stroke={item.color}
                            strokeWidth="3.8"
                            strokeDasharray={dashArray}
                            strokeDashoffset={offset}
                        ></circle>
                    );
                 })}
            </svg>
        </div>
    );
};

const AreaChart: React.FC<{data: {x: number, y: number}[], config: any}> = ({data, config}) => {
    const width = 300;
    const height = 150;
    const padding = 20;

    const maxX = config.xAxis.max || Math.max(...data.map(d => d.x));
    const maxY = config.yAxis.max || Math.max(...data.map(d => d.y));

    const xScale = (x: number) => padding + (x / maxX) * (width - 2 * padding);
    const yScale = (y: number) => height - padding - (y / maxY) * (height - 2 * padding);

    const pathD = "M" + data.map(d => `${xScale(d.x)},${yScale(d.y)}`).join(" L ") 
                + ` L ${xScale(maxX)},${height - padding} L ${xScale(0)},${height - padding} Z`;

    const yAxisLabels = [0, maxY/2, maxY].map(val => ({
        value: val,
        y: yScale(val)
    }));

     const xAxisLabels = [0, maxX/2, maxX].map(val => ({
        value: val,
        x: xScale(val)
    }));
    
    return (
         <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            {/* Grid lines */}
            {yAxisLabels.map(label => (
                <line key={label.value} x1={padding} y1={label.y} x2={width - padding} y2={label.y} stroke="#e5e7eb" strokeWidth="0.5" />
            ))}

            {/* Area Path */}
            <path d={pathD} fill={config.color} fillOpacity="0.3" />
            <path d={pathD.substring(0, pathD.indexOf(' L ')+2) + pathD.substring(pathD.indexOf(' L ')+2, pathD.lastIndexOf(' L '))} stroke={config.color} strokeWidth="1.5" fill="none" />
            
             {/* Axes Labels */}
            {yAxisLabels.map(label => (
                <text key={label.value} x="0" y={label.y} dy="3" fontSize="8" fill="#6b7280">${Math.round(label.value/1000)}k</text>
            ))}
             {xAxisLabels.map(label => (
                <text key={label.value} x={label.x} y={height-5} textAnchor="middle" fontSize="8" fill="#6b7280">{Math.round(label.value/12)}y</text>
            ))}
        </svg>
    )
};

const BarChart: React.FC<{data: ChartDataPoint[], config: any}> = ({data, config}) => {
    const { keys, colors, layout = 'vertical' } = config;
    const width = 300;
    const height = 150;
    const padding = 20;
    const barPadding = 0.2;

    const isHorizontal = layout === 'horizontal';
    
    const totalValues = data.map(d => keys.reduce((sum: number, key: string) => sum + (d[key] as number), 0));
    const maxTotal = Math.max(...totalValues);

    const numBars = data.length;

    return (
         <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            {/* Y-Axis Labels (for vertical) or X-Axis Gridlines (for horizontal) */}
             {[0, maxTotal/2, maxTotal].map(val => (
                <g key={val}>
                    <line 
                        x1={padding} y1={height - padding - (val/maxTotal)*(height - 2*padding)}
                        x2={width - padding} y2={height - padding - (val/maxTotal)*(height - 2*padding)}
                        stroke="#e5e7eb" strokeWidth="0.5" />
                    <text x="0" y={height - padding - (val/maxTotal)*(height - 2*padding)} dy="3" fontSize="8" fill="#6b7280">${(val/1000).toFixed(0)}k</text>
                </g>
             ))}

            {/* Bars */}
            {data.map((d, i) => {
                let currentOffset = 0;
                const barWidth = (width - 2 * padding) / numBars;
                const barInnerWidth = barWidth * (1 - barPadding);
                
                return (
                    <g key={i} transform={`translate(${padding + i * barWidth + (barWidth * barPadding / 2)}, 0)`}>
                        {keys.map((key: string, j: number) => {
                            const value = d[key] as number;
                            const barHeight = (value / maxTotal) * (height - 2 * padding);
                            const rect = (
                                 <rect
                                    key={key}
                                    x="0"
                                    y={height - padding - barHeight - currentOffset}
                                    width={barInnerWidth}
                                    height={barHeight}
                                    fill={colors[j]}
                                />
                            );
                            currentOffset += barHeight;
                            return rect;
                        })}
                    </g>
                )
            })}
             {/* X-Axis Labels */}
             {data.map((d,i) => (
                <text key={i} x={padding + i * ((width-2*padding)/numBars) + ((width-2*padding)/numBars)/2} y={height - 5} textAnchor="middle" fontSize="8" fill="#6b7280">{d.name as string}</text>
             ))}
         </svg>
    )
};

const LineChart: React.FC<{data: ChartDataPoint[], config: any}> = ({data, config}) => {
    const { keys, colors } = config;
    const width = 400;
    const height = 200;
    const padding = 30;

    const allYValues = data.flatMap(d => keys.map((key: string) => d[key] as number));
    const maxY = Math.max(...allYValues);
    const maxX = data.length - 1;

    const xScale = (index: number) => padding + (index / maxX) * (width - 2 * padding);
    const yScale = (y: number) => height - padding - (y / maxY) * (height - 2 * padding);
    
    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
             {/* Grid and Y-axis labels */}
             {[0, maxY/2, maxY].map(val => (
                <g key={val}>
                    <line x1={padding} y1={yScale(val)} x2={width - padding} y2={yScale(val)} stroke="#e5e7eb" strokeWidth="0.5" />
                    <text x="0" y={yScale(val)} dy="3" fontSize="10" fill="#6b7280">${val.toLocaleString(undefined, {notation: 'compact'})}</text>
                </g>
            ))}

            {/* Lines */}
            {keys.map((key: string, i: number) => {
                const pathD = "M" + data.map((d, index) => `${xScale(index)},${yScale(d[key] as number)}`).join(" L ");
                return <path key={key} d={pathD} stroke={colors[i]} strokeWidth="2" fill="none" />
            })}

            {/* X-axis labels */}
            {data.map((d, i) => (
                <text key={i} x={xScale(i)} y={height - 10} textAnchor="middle" fontSize="10" fill="#6b7280">{d.x as number / 12}y</text>
            ))}
        </svg>
    )
};

export default Chart;
