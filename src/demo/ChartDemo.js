// 定义销售数据模型
if (!Ext.ClassManager.get('Demo.model.Sale')) {
    Ext.define('Demo.model.Sale', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'month', type: 'string' },
            { name: 'product1', type: 'int' },
            { name: 'product2', type: 'int' },
            { name: 'product3', type: 'int' }
        ]
    });
}

// 定义饼图数据模型
if (!Ext.ClassManager.get('Demo.model.Market')) {
    Ext.define('Demo.model.Market', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'category', type: 'string' },
            { name: 'value', type: 'int' }
        ]
    });
}

Ext.define('Demo.ChartDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Chart 图表演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    initComponent: function () {
        this.callParent();
    },

    items: [{
        xtype: 'panel',
        title: '1. 柱状图',
        margin: '0 0 10 0',
        items: [{
            xtype: 'cartesian',
            width: '100%',
            height: 300,
            store: {
                model: 'Demo.model.Sale',
                data: [{
                    month: '1月',
                    product1: 100,
                    product2: 150,
                    product3: 120
                }, {
                    month: '2月',
                    product1: 130,
                    product2: 170,
                    product3: 140
                }, {
                    month: '3月',
                    product1: 150,
                    product2: 190,
                    product3: 160
                }]
            },
            axes: [{
                type: 'numeric',
                position: 'left',
                title: {
                    text: '销售量',
                    fontSize: 15
                },
                grid: true
            }, {
                type: 'category',
                position: 'bottom',
                title: {
                    text: '月份',
                    fontSize: 15
                }
            }],
            series: [{
                type: 'bar',
                xField: 'month',
                yField: 'product1',
                title: '产品1',
                style: {
                    opacity: 0.80
                },
                highlight: {
                    fillStyle: 'rgba(204, 230, 244, 1.0)'
                },
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record, item) {
                        tooltip.setHtml('产品1: ' + record.get('product1'));
                    }
                }
            }, {
                type: 'bar',
                xField: 'month',
                yField: 'product2',
                title: '产品2',
                style: {
                    opacity: 0.80
                },
                highlight: {
                    fillStyle: 'rgba(204, 230, 244, 1.0)'
                },
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record, item) {
                        tooltip.setHtml('产品2: ' + record.get('product2'));
                    }
                }
            }],
            legend: {
                docked: 'right'
            }
        }]
    }, {
        xtype: 'panel',
        title: '2. 折线图',
        margin: '0 0 10 0',
        items: [{
            xtype: 'cartesian',
            width: '100%',
            height: 300,
            store: {
                model: 'Demo.model.Sale',
                data: [{
                    month: '1月',
                    product1: 100,
                    product2: 150,
                    product3: 120
                }, {
                    month: '2月',
                    product1: 130,
                    product2: 170,
                    product3: 140
                }, {
                    month: '3月',
                    product1: 150,
                    product2: 190,
                    product3: 160
                }]
            },
            axes: [{
                type: 'numeric',
                position: 'left',
                title: {
                    text: '销售量',
                    fontSize: 15
                },
                grid: true
            }, {
                type: 'category',
                position: 'bottom',
                title: {
                    text: '月份',
                    fontSize: 15
                }
            }],
            series: [{
                type: 'line',
                xField: 'month',
                yField: 'product1',
                title: '产品1',
                marker: {
                    type: 'circle',
                    radius: 4
                },
                style: {
                    lineWidth: 2
                },
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record, item) {
                        tooltip.setHtml('产品1: ' + record.get('product1'));
                    }
                }
            }, {
                type: 'line',
                xField: 'month',
                yField: 'product2',
                title: '产品2',
                marker: {
                    type: 'circle',
                    radius: 4
                },
                style: {
                    lineWidth: 2
                },
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record, item) {
                        tooltip.setHtml('产品2: ' + record.get('product2'));
                    }
                }
            }],
            legend: {
                docked: 'right'
            }
        }]
    }, {
        xtype: 'panel',
        title: '3. 饼图',
        margin: '0 0 10 0',
        items: [{
            xtype: 'polar',
            width: '100%',
            height: 300,
            store: {
                model: 'Demo.model.Market',
                data: [{
                    category: '市场1',
                    value: 35
                }, {
                    category: '市场2',
                    value: 25
                }, {
                    category: '市场3',
                    value: 20
                }, {
                    category: '市场4',
                    value: 20
                }]
            },
            series: [{
                type: 'pie',
                angleField: 'value',
                label: {
                    field: 'category',
                    calloutLine: {
                        length: 60,
                        width: 2
                    }
                },
                highlight: true,
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record, item) {
                        tooltip.setHtml(record.get('category') + ': ' + record.get('value') + '%');
                    }
                }
            }],
            legend: {
                docked: 'right'
            }
        }]
    }, {
        xtype: 'panel',
        title: '4. 组合图表',
        margin: '0 0 10 0',
        items: [{
            xtype: 'cartesian',
            width: '100%',
            height: 300,
            store: {
                model: 'Demo.model.Sale',
                data: [{
                    month: '1月',
                    product1: 100,
                    product2: 150,
                    product3: 120
                }, {
                    month: '2月',
                    product1: 130,
                    product2: 170,
                    product3: 140
                }, {
                    month: '3月',
                    product1: 150,
                    product2: 190,
                    product3: 160
                }]
            },
            axes: [{
                type: 'numeric',
                position: 'left',
                title: {
                    text: '销售量',
                    fontSize: 15
                },
                grid: true
            }, {
                type: 'category',
                position: 'bottom',
                title: {
                    text: '月份',
                    fontSize: 15
                }
            }],
            series: [{
                type: 'bar',
                xField: 'month',
                yField: 'product1',
                title: '产品1(柱状)',
                style: {
                    opacity: 0.80
                },
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record, item) {
                        tooltip.setHtml('产品1: ' + record.get('product1'));
                    }
                }
            }, {
                type: 'line',
                xField: 'month',
                yField: 'product2',
                title: '产品2(折线)',
                marker: {
                    type: 'circle',
                    radius: 4
                },
                style: {
                    lineWidth: 2
                },
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record, item) {
                        tooltip.setHtml('产品2: ' + record.get('product2'));
                    }
                }
            }],
            legend: {
                docked: 'right'
            }
        }]
    }, {
        xtype: 'panel',
        title: '5. 动态更新图表',
        margin: '0 0 10 0',
        items: [{
            xtype: 'cartesian',
            width: '100%',
            height: 300,
            store: {
                model: 'Demo.model.Sale',
                data: [{
                    month: '1月',
                    product1: 100,
                    product2: 150
                }, {
                    month: '2月',
                    product1: 130,
                    product2: 170
                }, {
                    month: '3月',
                    product1: 150,
                    product2: 190
                }]
            },
            axes: [{
                type: 'numeric',
                position: 'left',
                title: {
                    text: '销售量',
                    fontSize: 15
                },
                grid: true
            }, {
                type: 'category',
                position: 'bottom',
                title: {
                    text: '月份',
                    fontSize: 15
                }
            }],
            series: [{
                type: 'line',
                xField: 'month',
                yField: 'product1',
                title: '产品1',
                marker: {
                    type: 'circle',
                    radius: 4
                },
                style: {
                    lineWidth: 2
                },
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record, item) {
                        tooltip.setHtml('产品1: ' + record.get('product1'));
                    }
                }
            }],
            legend: {
                docked: 'right'
            }
        }],
        tbar: [{
            text: '添加数据',
            handler: function (btn) {
                var chart = btn.up('panel').down('cartesian');
                var store = chart.getStore();
                var count = store.getCount();
                store.add({
                    month: (count + 1) + '月',
                    product1: Math.floor(Math.random() * 100) + 100,
                    product2: Math.floor(Math.random() * 100) + 150
                });
            }
        }, {
            text: '更新数据',
            handler: function (btn) {
                var chart = btn.up('panel').down('cartesian');
                var store = chart.getStore();
                store.each(function (record) {
                    record.set('product1', Math.floor(Math.random() * 100) + 100);
                    record.set('product2', Math.floor(Math.random() * 100) + 150);
                });
            }
        }, {
            text: '清除数据',
            handler: function (btn) {
                var chart = btn.up('panel').down('cartesian');
                var store = chart.getStore();
                store.removeAll();
            }
        }]
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Chart</strong>组件提供了丰富的图表功能:</p>' +
                '<ul>' +
                '<li>柱状图: 展示分类数据的对比</li>' +
                '<li>折线图: 展示数据的变化趋势</li>' +
                '<li>饼图: 展示数据的占比分布</li>' +
                '<li>组合图表: 在同一图表中展示不同类型的数据</li>' +
                '<li>动态更新: 支持图表数据的动态更新</li>' +
                '</ul>' +
                '<p>图表组件支持丰富的交互功能和样式配置。</p>' +
                '</div>'
        }]
    }
}); 
