Ext.define('Demo.WindowDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Window 窗口演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    defaults: {
        xtype: 'panel',
        margin: '0 0 10 0',
        bodyPadding: 10
    },

    items: [{
        title: '1. 基本窗口',
        html: '<p>基本窗口是最简单的浮动窗口，可以自由拖动和调整大小。</p>',
        buttons: [{
            text: '打开基本窗口',
            handler: function () {
                var win = Ext.create('Ext.window.Window', {
                    title: '基本窗口',
                    width: 400,
                    height: 300,
                    draggable: true,
                    resizable: true,
                    modal: false,
                    html: '<div style="padding: 10px;">' +
                        '<h3>这是一个基本窗口</h3>' +
                        '<p>特点：</p>' +
                        '<ul>' +
                        '<li>可以拖动</li>' +
                        '<li>可以调整大小</li>' +
                        '<li>非模态（不会阻止与其他窗口的交互）</li>' +
                        '</ul>' +
                        '</div>'
                });
                win.show();
            }
        }]
    }, {
        title: '2. 模态窗口',
        html: '<p>模态窗口会阻止用户与其他窗口的交互，直到关闭当前窗口。</p>',
        buttons: [{
            text: '打开模态窗口',
            handler: function () {
                var win = Ext.create('Ext.window.Window', {
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
                        handler: function (btn) {
                            var form = btn.up('window').down('form');
                            if (form.isValid()) {
                                Ext.Msg.alert('成功', '表单验证通过！');
                                btn.up('window').close();
                            } else {
                                Ext.Msg.alert('错误', '请填写所有必填字段！');
                            }
                        }
                    }, {
                        text: '取消',
                        handler: function (btn) {
                            btn.up('window').close();
                        }
                    }]
                });
                win.show();
            }
        }]
    }, {
        title: '3. 消息框',
        html: '<p>ExtJS提供了多种预定义的消息框样式。</p>',
        buttons: [{
            text: '确认框',
            handler: function () {
                Ext.Msg.confirm('确认', '确定要执行此操作吗？', function (btn) {
                    if (btn === 'yes') {
                        Ext.Msg.alert('结果', '你选择了确定');
                    }
                });
            }
        }, {
            text: '提示框',
            handler: function () {
                Ext.Msg.alert('提示', '操作已完成！');
            }
        }, {
            text: '警告框',
            handler: function () {
                Ext.Msg.show({
                    title: '警告',
                    message: '此操作可能有风险，是否继续？',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.WARNING,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            Ext.Msg.alert('结果', '你选择了继续执行');
                        }
                    }
                });
            }
        }, {
            text: '错误框',
            handler: function () {
                Ext.Msg.show({
                    title: '错误',
                    message: '发生了一个错误！',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        }]
    }, {
        title: '4. 自定义窗口',
        html: '<p>可以创建具有自定义布局和功能的窗口。</p>',
        buttons: [{
            text: '打开自定义窗口',
            handler: function () {
                var win = Ext.create('Ext.window.Window', {
                    title: '自定义窗口',
                    width: 600,
                    height: 400,
                    modal: true,
                    layout: 'border',
                    items: [{
                        region: 'west',
                        width: 200,
                        split: true,
                        collapsible: true,
                        title: '导航菜单',
                        xtype: 'treepanel',
                        root: {
                            text: '根节点',
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
                    }, {
                        region: 'center',
                        xtype: 'tabpanel',
                        items: [{
                            title: '选项卡1',
                            html: '这是第一个选项卡的内容'
                        }, {
                            title: '选项卡2',
                            html: '这是第二个选项卡的内容'
                        }]
                    }],
                    buttons: [{
                        text: '保存',
                        handler: function () {
                            Ext.Msg.alert('提示', '保存成功！');
                        }
                    }, {
                        text: '关闭',
                        handler: function (btn) {
                            btn.up('window').close();
                        }
                    }]
                });
                win.show();
            }
        }]
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Window</strong>组件提供了丰富的窗口功能:</p>' +
                '<ul>' +
                '<li>基本窗口: 可拖动、可调整大小的浮动窗口</li>' +
                '<li>模态窗口: 阻止与其他窗口交互的窗口</li>' +
                '<li>消息框: 预定义的各种消息提示框</li>' +
                '<li>自定义窗口: 支持复杂布局和自定义功能</li>' +
                '</ul>' +
                '</div>'
        }]
    }
}); 