Ext.define('Demo.TooltipDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Tooltip 提示框演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'panel',
        title: '1. 基本提示框',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                text: '鼠标悬停显示提示',
                tooltip: '这是一个简单的提示框'
            }, {
                xtype: 'button',
                text: '带标题的提示',
                tooltip: {
                    title: '提示标题',
                    text: '这是一个带标题的提示框'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '输入框提示',
                tooltip: '请输入您的用户名'
            }]
        }]
    }, {
        xtype: 'panel',
        title: '2. HTML提示框',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                text: '富文本提示',
                tooltip: {
                    html: '<div style="padding: 5px;">' +
                        '<h3 style="margin: 0 0 5px 0;">HTML提示</h3>' +
                        '<p style="margin: 0;">这是一个<b>富文本</b>提示框，支持<span style="color: red;">HTML</span>格式。</p>' +
                        '</div>'
                }
            }, {
                xtype: 'button',
                text: '带图片的提示',
                tooltip: {
                    html: '<div style="padding: 5px;">' +
                        '<img src="https://via.placeholder.com/50" style="float: left; margin-right: 5px;">' +
                        '<p style="margin: 0;">这是一个带图片的提示框。</p>' +
                        '<div style="clear: both;"></div>' +
                        '</div>'
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '3. 锚点提示框',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                text: '上方提示',
                tooltip: {
                    text: '这是一个显示在上方的提示框',
                    anchor: 'top'
                }
            }, {
                xtype: 'button',
                text: '右方提示',
                tooltip: {
                    text: '这是一个显示在右方的提示框',
                    anchor: 'right'
                }
            }, {
                xtype: 'button',
                text: '下方提示',
                tooltip: {
                    text: '这是一个显示在下方的提示框',
                    anchor: 'bottom'
                }
            }, {
                xtype: 'button',
                text: '左方提示',
                tooltip: {
                    text: '这是一个显示在左方的提示框',
                    anchor: 'left'
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '4. 自定义提示框',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                text: '延迟显示提示',
                tooltip: {
                    text: '这个提示框延迟1秒显示',
                    showDelay: 1000
                }
            }, {
                xtype: 'button',
                text: '自动隐藏提示',
                tooltip: {
                    text: '这个提示框将在3秒后自动隐藏',
                    dismissDelay: 3000
                }
            }, {
                xtype: 'button',
                text: '跟随鼠标提示',
                tooltip: {
                    text: '这个提示框会跟随鼠标移动',
                    trackMouse: true
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '5. 动态提示框',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                text: '动态内容提示',
                listeners: {
                    render: function (btn) {
                        Ext.create('Ext.tip.ToolTip', {
                            target: btn.el,
                            html: '初始提示内容',
                            listeners: {
                                beforeshow: function (tip) {
                                    tip.update('当前时间: ' + Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                                }
                            }
                        });
                    }
                }
            }, {
                xtype: 'button',
                text: '带表单的提示',
                listeners: {
                    render: function (btn) {
                        Ext.create('Ext.tip.ToolTip', {
                            target: btn.el,
                            width: 200,
                            dismissDelay: 0,
                            items: [{
                                xtype: 'form',
                                bodyPadding: 5,
                                items: [{
                                    xtype: 'textfield',
                                    fieldLabel: '用户名'
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: '密码',
                                    inputType: 'password'
                                }],
                                buttons: [{
                                    text: '登录',
                                    handler: function () {
                                        Ext.Msg.alert('提示', '这只是一个演示!');
                                    }
                                }]
                            }]
                        });
                    }
                }
            }]
        }]
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Tooltip</strong>组件提供了丰富的提示框功能:</p>' +
                '<ul>' +
                '<li>基本提示框: 简单文本、带标题等</li>' +
                '<li>HTML提示框: 支持富文本格式</li>' +
                '<li>锚点提示框: 可以指定显示位置</li>' +
                '<li>自定义提示框: 延迟显示、自动隐藏等</li>' +
                '<li>动态提示框: 动态内容、复杂布局等</li>' +
                '</ul>' +
                '<p>提示框组件可以为用户提供即时的帮助信息。</p>' +
                '</div>'
        }]
    }
}); 