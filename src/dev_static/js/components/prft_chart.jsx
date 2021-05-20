import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { ResponsiveLine } from '@nivo/line'

const height = 150;
const width = screen.width;

const gradProps = {
  gradientUnits: 'userSpaceOnUse',
  x1: '0',
  y1: '0',
  x2: '0',
  y2: height
};

const theme = {
  fontSize: '0.8rem',
  textColor: '#aeaeae',
}

class ProfitChart extends React.Component {
    render() {
      return (
        <div style={{ height, width }}>
          <svg style={{height: 0 + 'px'}}>
            <defs>
              <linearGradient id="someGradientId" {...gradProps}>
                <stop offset="40%" stopColor="#17d9a2" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
          </svg>
          <ResponsiveLine
          data={this.props.data}
          margin={{ top: 10, right: 1, bottom: 25, left: 1 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          curve="cardinal"
          colors={['url(#someGradientId)']}
          enableArea={true}
          axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
          }}
          lineWidth={4}
          pointSize={10}
          enableGridX={false}
          enableGridY={false}
          pointColor="#17d9a2"
          pointBorderWidth={0}
          pointLabelYOffset={-12}
          legends={[]}
          // onClick={click}
          useMesh={true}
          tooltip={(point) => {
            return <div className="Tooltip">
                     <div className='tooltip_label'>${point.point.data.yFormatted}</div>
                     <div className='tooltip_sign'></div>
                   </div>;
          }}
          motionConfig="default"
          theme={theme}
      />
      </div>
      );
    }
}

export default ProfitChart;