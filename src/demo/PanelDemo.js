Ext.define('Demo.PanelDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Panel 组件演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'panel',
        title: '1. 基本面板',
        margin: '0 0 10 0',
        html: '这是一个基本的Panel,包含标题、内容区域。'
    }, {
        xtype: 'panel',
        title: '2. 带工具按钮的面板',
        margin: '0 0 10 0',
        collapsible: true,
        tools: [{
            type: 'refresh',
            tooltip: '刷新',
            handler: function () {
                Ext.Msg.alert('提示', '点击了刷新按钮');
            }
        }, {
            type: 'help',
            tooltip: '帮助',
            handler: function () {
                Ext.Msg.alert('提示', '点击了帮助按钮');
            }
        }],
        html: '这个Panel包含了工具按钮,并且可以折叠/展开。'
    }, {
        xtype: 'panel',
        title: '3. 带工具栏的面板',
        margin: '0 0 10 0',
        tbar: [{
            text: '新建',
            iconCls: 'x-fa fa-plus',
            handler: function () {
                Ext.Msg.alert('提示', '点击了新建按钮');
            }
        }, {
            text: '编辑',
            iconCls: 'x-fa fa-edit',
            handler: function () {
                Ext.Msg.alert('提示', '点击了编辑按钮');
            }
        }, '->', {
            text: '帮助',
            iconCls: 'x-fa fa-question'
        }],
        bbar: {
            xtype: 'statusbar',
            defaultText: '就绪'
        },
        html: '这个Panel包含了顶部工具栏(tbar)和底部状态栏(bbar)。'
    }, {
        xtype: 'panel',
        title: '4. 嵌套面板',
        margin: '0 0 10 0',
        layout: 'hbox',
        defaults: {
            flex: 1,
            margin: '0 5'
        },
        items: [{
            xtype: 'panel',
            title: '子面板1',
            html: '这是嵌套的子面板1'
        }, {
            xtype: 'panel',
            title: '子面板2',
            html: '这是嵌套的子面板2'
        }]
    }, {
        xtype: 'panel',
        title: '5. 自定义样式面板',
        margin: '0 0 10 0',
        frame: true,
        bodyStyle: {
            padding: '10px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd'
        },
        html: '<div style="color: #157fcc;">这个Panel使用了自定义样式。</div>'
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Panel</strong>是ExtJS中最基础和常用的容器组件,它提供了:</p>' +
                '<ul>' +
                '<li>标题栏和图标</li>' +
                '<li>可折叠/展开功能</li>' +
                '<li>工具按钮</li>' +
                '<li>顶部/底部工具栏</li>' +
                '<li>自定义样式</li>' +
                '<li>嵌套其他组件的能力</li>' +
                '</ul>' +
                '</div>'
        }]
    }
}); 