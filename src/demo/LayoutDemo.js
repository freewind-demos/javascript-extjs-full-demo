Ext.define('Demo.LayoutDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Layout 布局演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'panel',
        title: '1. Border Layout',
        height: 300,
        margin: '0 0 10 0',
        layout: 'border',
        items: [{
            region: 'north',
            height: 50,
            bodyStyle: 'background:#ddd;',
            html: 'North Region',
            split: true
        }, {
            region: 'west',
            width: 150,
            bodyStyle: 'background:#eee;',
            html: 'West Region',
            collapsible: true,
            split: true
        }, {
            region: 'center',
            bodyStyle: 'background:#fff;',
            html: 'Center Region (必需的)'
        }, {
            region: 'east',
            width: 150,
            bodyStyle: 'background:#eee;',
            html: 'East Region',
            collapsible: true,
            split: true
        }, {
            region: 'south',
            height: 50,
            bodyStyle: 'background:#ddd;',
            html: 'South Region',
            split: true
        }]
    }, {
        xtype: 'panel',
        title: '2. Box Layout',
        height: 200,
        margin: '0 0 10 0',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'panel',
            title: 'HBox Layout',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                margin: '5'
            },
            items: [{
                xtype: 'panel',
                title: 'Width: 100',
                width: 100,
                html: 'Fixed width'
            }, {
                xtype: 'panel',
                title: 'Flex: 1',
                flex: 1,
                html: 'Flexible width'
            }, {
                xtype: 'panel',
                title: 'Flex: 2',
                flex: 2,
                html: 'Double flex'
            }]
        }, {
            xtype: 'panel',
            title: 'VBox Layout',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                margin: '5'
            },
            items: [{
                xtype: 'panel',
                title: 'Height: 30',
                height: 30,
                html: 'Fixed height'
            }, {
                xtype: 'panel',
                title: 'Flex: 1',
                flex: 1,
                html: 'Flexible height'
            }]
        }]
    }, {
        xtype: 'panel',
        title: '3. Card Layout',
        height: 200,
        margin: '0 0 10 0',
        layout: 'card',
        itemId: 'cardPanel',
        tbar: [{
            text: '第一页',
            handler: function () {
                this.up('#cardPanel').getLayout().setActiveItem(0);
            }
        }, {
            text: '第二页',
            handler: function () {
                this.up('#cardPanel').getLayout().setActiveItem(1);
            }
        }, {
            text: '第三页',
            handler: function () {
                this.up('#cardPanel').getLayout().setActiveItem(2);
            }
        }],
        items: [{
            html: '<div style="padding:10px">这是第一页的内容</div>',
            bodyStyle: 'background:#f5f5f5;'
        }, {
            html: '<div style="padding:10px">这是第二页的内容</div>',
            bodyStyle: 'background:#e5e5e5;'
        }, {
            html: '<div style="padding:10px">这是第三页的内容</div>',
            bodyStyle: 'background:#d5d5d5;'
        }]
    }, {
        xtype: 'panel',
        title: '4. Accordion Layout',
        height: 300,
        margin: '0 0 10 0',
        layout: 'accordion',
        items: [{
            title: '第一部分',
            html: '这是第一部分的内容。Accordion布局一次只显示一个面板。'
        }, {
            title: '第二部分',
            html: '这是第二部分的内容。点击标题可以展开/折叠面板。'
        }, {
            title: '第三部分',
            html: '这是第三部分的内容。这种布局适合导航菜单等场景。'
        }]
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Layout</strong>是ExtJS中的核心概念之一,它负责管理容器中组件的大小和位置。主要布局类型包括:</p>' +
                '<ul>' +
                '<li><strong>Border Layout</strong>: 将容器分为五个区域(north, south, east, west, center)</li>' +
                '<li><strong>Box Layout</strong>: 水平(HBox)或垂直(VBox)排列组件</li>' +
                '<li><strong>Card Layout</strong>: 一次只显示一个组件,适合向导或标签页</li>' +
                '<li><strong>Accordion Layout</strong>: 可折叠的面板组,一次只展开一个</li>' +
                '</ul>' +
                '<p>布局可以嵌套使用,创建复杂的界面结构。</p>' +
                '</div>'
        }]
    }
}); 