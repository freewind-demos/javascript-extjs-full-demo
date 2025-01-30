Ext.define('Demo.ContainerDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Container 容器演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'panel',
        title: '1. 基本容器',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            style: {
                border: '1px dashed #ccc',
                margin: '10px'
            },
            html: '这是一个基本的Container,它可以包含其他组件。'
        }]
    }, {
        xtype: 'panel',
        title: '2. 自动布局容器',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            style: {
                border: '1px dashed #ccc',
                margin: '10px'
            },
            layout: 'auto',
            items: [{
                xtype: 'button',
                text: '按钮1'
            }, {
                xtype: 'button',
                text: '按钮2',
                margin: '0 0 0 10'
            }, {
                xtype: 'textfield',
                fieldLabel: '文本框',
                margin: '10 0 0 0'
            }]
        }]
    }, {
        xtype: 'panel',
        title: '3. 锚点布局容器',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            style: {
                border: '1px dashed #ccc',
                margin: '10px'
            },
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                margin: '0 0 10 0'
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: '100%宽度'
            }, {
                xtype: 'textfield',
                fieldLabel: '75%宽度',
                anchor: '75%'
            }, {
                xtype: 'textfield',
                fieldLabel: '固定宽度',
                anchor: '200'
            }]
        }]
    }, {
        xtype: 'panel',
        title: '4. 表单布局容器',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            style: {
                border: '1px dashed #ccc',
                margin: '10px'
            },
            layout: 'form',
            defaults: {
                xtype: 'textfield',
                margin: '0 0 10 0'
            },
            items: [{
                fieldLabel: '字段1'
            }, {
                fieldLabel: '字段2'
            }, {
                fieldLabel: '字段3'
            }]
        }]
    }, {
        xtype: 'panel',
        title: '5. 嵌套容器',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            style: {
                border: '1px dashed #ccc',
                margin: '10px'
            },
            layout: 'hbox',
            items: [{
                xtype: 'container',
                flex: 1,
                margin: '0 5 0 0',
                style: {
                    border: '1px solid #eee',
                    padding: '10px'
                },
                layout: 'vbox',
                items: [{
                    xtype: 'button',
                    text: '左侧按钮1',
                    margin: '0 0 5 0'
                }, {
                    xtype: 'button',
                    text: '左侧按钮2'
                }]
            }, {
                xtype: 'container',
                flex: 2,
                style: {
                    border: '1px solid #eee',
                    padding: '10px'
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '右侧字段1',
                    margin: '0 0 5 0'
                }, {
                    xtype: 'textfield',
                    fieldLabel: '右侧字段2'
                }]
            }]
        }]
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Container</strong>是ExtJS中最基础的容器组件,它提供了:</p>' +
                '<ul>' +
                '<li>组件的容纳和管理</li>' +
                '<li>多种布局方式</li>' +
                '<li>组件的自动定位</li>' +
                '<li>嵌套容器支持</li>' +
                '<li>灵活的配置选项</li>' +
                '</ul>' +
                '<p>Container通常作为其他组件的基类,如Panel、Window等。</p>' +
                '</div>'
        }]
    }
}); 