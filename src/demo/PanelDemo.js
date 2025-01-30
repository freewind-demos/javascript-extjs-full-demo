Ext.define('Demo.PanelDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Panel 面板演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'panel',
        title: '1. 基本面板',
        margin: '0 0 10 0',
        items: [{
            xtype: 'panel',
            title: '简单面板',
            width: 300,
            height: 150,
            margin: 10,
            html: '这是一个基本的面板，包含标题和内容。'
        }, {
            xtype: 'panel',
            title: '带图标的面板',
            width: 300,
            height: 150,
            margin: 10,
            iconCls: 'x-fa fa-star',
            html: '这个面板在标题栏有一个图标。'
        }]
    }, {
        xtype: 'panel',
        title: '2. 工具按钮',
        margin: '0 0 10 0',
        items: [{
            xtype: 'panel',
            title: '带工具按钮的面板',
            width: 400,
            height: 200,
            margin: 10,
            collapsible: true,
            tools: [{
                type: 'refresh',
                tooltip: '刷新',
                handler: function () {
                    Ext.Msg.alert('提示', '刷新按钮被点击');
                }
            }, {
                type: 'help',
                tooltip: '帮助',
                handler: function () {
                    Ext.Msg.alert('提示', '帮助按钮被点击');
                }
            }, {
                type: 'save',
                tooltip: '保存',
                handler: function () {
                    Ext.Msg.alert('提示', '保存按钮被点击');
                }
            }],
            html: '这个面板在标题栏右侧有工具按钮。'
        }]
    }, {
        xtype: 'panel',
        title: '3. 折叠面板',
        margin: '0 0 10 0',
        items: [{
            xtype: 'panel',
            title: '可折叠面板',
            width: 400,
            height: 200,
            margin: 10,
            collapsible: true,
            titleCollapse: true,
            html: '点击标题栏或折叠按钮可以折叠/展开面板。',
            tools: [{
                type: 'pin',
                tooltip: '固定',
                handler: function (event, target, owner, tool) {
                    var panel = owner.up('panel');
                    if (tool.type === 'pin') {
                        panel.setCollapsible(false);
                        tool.setType('unpin');
                        tool.setTooltip('取消固定');
                    } else {
                        panel.setCollapsible(true);
                        tool.setType('pin');
                        tool.setTooltip('固定');
                    }
                }
            }]
        }, {
            xtype: 'panel',
            title: '动画折叠面板',
            width: 400,
            height: 200,
            margin: 10,
            collapsible: true,
            animCollapse: true,
            html: '这个面板折叠/展开时有动画效果。'
        }]
    }, {
        xtype: 'panel',
        title: '4. 面板布局',
        margin: '0 0 10 0',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        height: 300,
        defaults: {
            flex: 1,
            margin: 10
        },
        items: [{
            xtype: 'panel',
            title: '左侧面板',
            bodyPadding: 10,
            html: '这是左侧面板的内容。'
        }, {
            xtype: 'panel',
            title: '中间面板',
            bodyPadding: 10,
            html: '这是中间面板的内容。'
        }, {
            xtype: 'panel',
            title: '右侧面板',
            bodyPadding: 10,
            html: '这是右侧面板的内容。'
        }]
    }, {
        xtype: 'panel',
        title: '5. 自定义样式',
        margin: '0 0 10 0',
        items: [{
            xtype: 'panel',
            title: '自定义标题样式',
            width: 400,
            height: 200,
            margin: 10,
            headerPosition: 'left',
            header: {
                titlePosition: 0,
                titleRotation: 0,
                style: {
                    backgroundColor: '#157fcc'
                },
                titleAlign: 'center'
            },
            bodyStyle: {
                backgroundColor: '#f5f5f5',
                padding: '10px'
            },
            html: '这个面板使用了自定义的标题和内容样式。'
        }, {
            xtype: 'panel',
            title: '圆角面板',
            width: 400,
            height: 200,
            margin: 10,
            frame: true,
            bodyStyle: {
                padding: '10px'
            },
            html: '这个面板使用了圆角边框样式。'
        }]
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Panel</strong>面板是ExtJS中最基础的容器组件，提供了丰富的功能:</p>' +
                '<ul>' +
                '<li>基本面板: 标题、图标等基本功能</li>' +
                '<li>工具按钮: 在标题栏添加工具按钮</li>' +
                '<li>折叠面板: 支持面板的折叠/展开</li>' +
                '<li>面板布局: 灵活的布局方式</li>' +
                '<li>自定义样式: 支持自定义外观</li>' +
                '</ul>' +
                '<p>面板组件是构建复杂界面的基础。</p>' +
                '</div>'
        }]
    }
}); 