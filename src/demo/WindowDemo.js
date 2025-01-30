Ext.define('Demo.WindowDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Window & Dialog 演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'panel',
        title: '1. 基本窗口',
        margin: '0 0 10 0',
        bodyPadding: 10,
        items: [{
            xtype: 'button',
            text: '打开基本窗口',
            handler: function () {
                Ext.create('Ext.window.Window', {
                    title: '基本窗口',
                    width: 400,
                    height: 300,
                    layout: 'fit',
                    items: [{
                        xtype: 'panel',
                        html: '<div style="padding:10px">' +
                            '<p>这是一个基本窗口示例。</p>' +
                            '<p>窗口可以拖动、调整大小,并且可以最大化/最小化。</p>' +
                            '</div>'
                    }]
                }).show();
            }
        }]
    }, {
        xtype: 'panel',
        title: '2. 模态窗口',
        margin: '0 0 10 0',
        bodyPadding: 10,
        items: [{
            xtype: 'button',
            text: '打开模态窗口',
            handler: function () {
                Ext.create('Ext.window.Window', {
                    title: '模态窗口',
                    width: 400,
                    height: 300,
                    modal: true,
                    layout: 'fit',
                    items: [{
                        xtype: 'form',
                        bodyPadding: 10,
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '用户名',
                            name: 'username',
                            allowBlank: false
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '密码',
                            name: 'password',
                            inputType: 'password',
                            allowBlank: false
                        }]
                    }],
                    buttons: [{
                        text: '确定',
                        handler: function () {
                            var win = this.up('window');
                            var form = win.down('form');
                            if (form.isValid()) {
                                Ext.Msg.alert('成功', '表单验证通过!');
                                win.close();
                            }
                        }
                    }, {
                        text: '取消',
                        handler: function () {
                            this.up('window').close();
                        }
                    }]
                }).show();
            }
        }]
    }, {
        xtype: 'panel',
        title: '3. 消息框',
        margin: '0 0 10 0',
        bodyPadding: 10,
        defaults: {
            xtype: 'button',
            margin: '0 10 0 0'
        },
        items: [{
            text: '提示框',
            handler: function () {
                Ext.Msg.alert('提示', '这是一个简单的提示框');
            }
        }, {
            text: '确认框',
            handler: function () {
                Ext.Msg.confirm('确认', '确定要执行此操作吗?', function (btn) {
                    if (btn === 'yes') {
                        Ext.Msg.alert('提示', '您点击了确定按钮');
                    }
                });
            }
        }, {
            text: '提示输入框',
            handler: function () {
                Ext.Msg.prompt('输入', '请输入您的名字:', function (btn, text) {
                    if (btn === 'ok') {
                        Ext.Msg.alert('提示', '您输入的是: ' + text);
                    }
                });
            }
        }, {
            text: '等待框',
            handler: function () {
                Ext.Msg.wait('正在处理,请稍候...', '请稍候');

                // 3秒后关闭等待框
                Ext.defer(function () {
                    Ext.Msg.hide();
                    Ext.Msg.alert('提示', '处理完成!');
                }, 3000);
            }
        }]
    }, {
        xtype: 'panel',
        title: '4. 提示框',
        margin: '0 0 10 0',
        bodyPadding: 10,
        items: [{
            xtype: 'button',
            text: '显示工具提示',
            tooltip: '这是一个简单的工具提示',
            tooltipType: 'title'
        }, {
            xtype: 'button',
            text: '显示富文本提示',
            margin: '0 0 0 10',
            tooltip: {
                html: '<div style="padding:5px">' +
                    '<h3>富文本提示</h3>' +
                    '<p>这是一个支持HTML的提示框</p>' +
                    '<ul>' +
                    '<li>可以包含列表</li>' +
                    '<li>支持样式</li>' +
                    '</ul>' +
                    '</div>'
            }
        }]
    }, {
        xtype: 'panel',
        title: '5. 自定义窗口',
        margin: '0 0 10 0',
        bodyPadding: 10,
        items: [{
            xtype: 'button',
            text: '打开自定义窗口',
            handler: function () {
                // 创建自定义窗口类
                Ext.define('CustomWindow', {
                    extend: 'Ext.window.Window',

                    title: '自定义窗口',
                    width: 600,
                    height: 400,
                    modal: true,
                    layout: 'border',

                    // 自定义样式
                    bodyStyle: {
                        background: '#f5f5f5'
                    },

                    // 自定义工具按钮
                    tools: [{
                        type: 'help',
                        tooltip: '帮助',
                        handler: function () {
                            Ext.Msg.alert('帮助', '这是帮助内容');
                        }
                    }],

                    // 初始化组件
                    initComponent: function () {
                        var me = this;

                        Ext.apply(me, {
                            items: [{
                                region: 'west',
                                width: 200,
                                split: true,
                                collapsible: true,
                                title: '导航',
                                layout: 'fit',
                                items: [{
                                    xtype: 'treepanel',
                                    root: {
                                        expanded: true,
                                        children: [{
                                            text: '选项1',
                                            leaf: true
                                        }, {
                                            text: '选项2',
                                            leaf: true
                                        }, {
                                            text: '选项3',
                                            expanded: true,
                                            children: [{
                                                text: '子选项1',
                                                leaf: true
                                            }, {
                                                text: '子选项2',
                                                leaf: true
                                            }]
                                        }]
                                    }
                                }]
                            }, {
                                region: 'center',
                                xtype: 'tabpanel',
                                items: [{
                                    title: '标签1',
                                    padding: 10,
                                    html: '这是第一个标签页的内容'
                                }, {
                                    title: '标签2',
                                    padding: 10,
                                    html: '这是第二个标签页的内容'
                                }]
                            }],
                            buttons: [{
                                text: '保存',
                                handler: function () {
                                    Ext.Msg.alert('提示', '点击了保存按钮');
                                }
                            }, {
                                text: '关闭',
                                handler: function () {
                                    me.close();
                                }
                            }]
                        });

                        me.callParent();
                    }
                });

                // 显示自定义窗口
                Ext.create('CustomWindow').show();
            }
        }]
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Window</strong>和<strong>Dialog</strong>组件提供了丰富的功能:</p>' +
                '<ul>' +
                '<li>基本窗口: 可拖动、调整大小</li>' +
                '<li>模态窗口: 阻止与其他界面交互</li>' +
                '<li>消息框: alert、confirm、prompt等</li>' +
                '<li>提示框: 简单和富文本提示</li>' +
                '<li>自定义窗口: 复杂的窗口布局和功能</li>' +
                '</ul>' +
                '<p>这些组件通常用于显示临时内容、收集用户输入和显示消息。</p>' +
                '</div>'
        }]
    }
}); 