<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="10"><div id="c1"></div></el-col>
      <el-col :span="10"><div id="c2"></div></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="10"><div id="c3" style="width: 500px;height: 400px;"></div></el-col>
      <el-col :span="10"><div id="c4" style="width: 500px;height: 400px;"></div></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import G2 from '@antv/g2'
import echarts from 'echarts'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Dashboard'
})
export default class extends Vue {
  mounted() {
    this.drawChartC1()
    this.drawChartC2()
    this.drawChartC3()
    this.drawChartC4()
  }

  private drawChartC1 () {
    const data = [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 }
    ];
    const chart = new G2.Chart({
      container: 'c1',
      forceFit: true,
      width: 500,
      height: 400
    });
    chart.source(data);
    chart.scale('value', {
      min: 0
    });
    chart.scale('year', {
      range: [ 0, 1 ]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.line().position('year*value');
    chart.point().position('year*value')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1
      });
    chart.render();
  }

  private drawChartC2 () {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 1150 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];

    const chart = new G2.Chart({
      container: 'c2',
      width: 500,
      height: 400
    });

    chart.source(data);
    chart.interval().position('genre*sold').color('genre');
    chart.render();
  }

  private drawChartC3 () {
    const element = document.getElementById('c3') as HTMLDivElement
    const myChart = echarts.init(element)
    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    };
    // @ts-ignore
    myChart.setOption(option)
  }

  private drawChartC4 () {
    const element = document.getElementById('c4') as HTMLDivElement
    const myChart = echarts.init(element)
      // 指定图表的配置项和数据
    const option = {
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'直接访问',
          type:'bar',
          data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
          name:'邮件营销',
          type:'bar',
          stack: '广告',
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'联盟广告',
          type:'bar',
          stack: '广告',
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'视频广告',
          type:'bar',
          stack: '广告',
          data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
          name:'搜索引擎',
          type:'bar',
          data:[862, 1018, 964, 1026, 1679, 1600, 1570],
          markLine : {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            data : [
              [{type : 'min'}, {type : 'max'}]
            ]
          }
        },
        {
          name:'百度',
          type:'bar',
          barWidth : 5,
          stack: '搜索引擎',
          data:[620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          name:'谷歌',
          type:'bar',
          stack: '搜索引擎',
          data:[120, 132, 101, 134, 290, 230, 220]
        },
        {
          name:'必应',
          type:'bar',
          stack: '搜索引擎',
          data:[60, 72, 71, 74, 190, 130, 110]
        },
        {
          name:'其他',
          type:'bar',
          stack: '搜索引擎',
          data:[62, 82, 91, 84, 109, 110, 120]
        }
      ]
    };
    // @ts-ignore
    myChart.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
