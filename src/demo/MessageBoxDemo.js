Ext.define('Demo.MessageBoxDemo', {
    extend: 'Ext.panel.Panel',

    title: 'MessageBox 消息框演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'panel',
        title: '1. 基本消息框',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                text: '显示消息',
                handler: function () {
                    Ext.Msg.show({
                        title: '提示',
                        message: '这是一个基本的消息框',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                }
            }, {
                xtype: 'button',
                text: '显示警告',
                handler: function () {
                    Ext.Msg.show({
                        title: '警告',
                        message: '这是一个警告消息框',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.WARNING
                    });
                }
            }, {
                xtype: 'button',
                text: '显示错误',
                handler: function () {
                    Ext.Msg.show({
                        title: '错误',
                        message: '这是一个错误消息框',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            }, {
                xtype: 'button',
                text: '显示问题',
                handler: function () {
                    Ext.Msg.show({
                        title: '问题',
                        message: '这是一个问题消息框',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.QUESTION
                    });
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '2. 确认框',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                text: '是/否确认框',
                handler: function () {
                    Ext.Msg.confirm('确认', '您确定要执行此操作吗?', function (btn) {
                        if (btn === 'yes') {
                            Ext.Msg.alert('提示', '您点击了"是"按钮');
                        } else {
                            Ext.Msg.alert('提示', '您点击了"否"按钮');
                        }
                    });
                }
            }, {
                xtype: 'button',
                text: '是/否/取消确认框',
                handler: function () {
                    Ext.Msg.show({
                        title: '确认',
                        message: '是否保存更改?',
                        buttons: Ext.Msg.YESNOCANCEL,
                        icon: Ext.Msg.QUESTION,
                        fn: function (btn) {
                            if (btn === 'yes') {
                                Ext.Msg.alert('提示', '您点击了"是"按钮');
                            } else if (btn === 'no') {
                                Ext.Msg.alert('提示', '您点击了"否"按钮');
                            } else {
                                Ext.Msg.alert('提示', '您点击了"取消"按钮');
                            }
                        }
                    });
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '3. 输入框',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                text: '单行输入框',
                handler: function () {
                    Ext.Msg.prompt('输入', '请输入您的姓名:', function (btn, text) {
                        if (btn === 'ok') {
                            Ext.Msg.alert('提示', '您输入的姓名是: ' + text);
                        }
                    });
                }
            }, {
                xtype: 'button',
                text: '多行输入框',
                handler: function () {
                    Ext.Msg.show({
                        title: '输入',
                        message: '请输入您的意见:',
                        width: 300,
                        buttons: Ext.Msg.OKCANCEL,
                        multiline: true,
                        fn: function (btn, text) {
                            if (btn === 'ok') {
                                Ext.Msg.alert('提示', '您输入的意见是: ' + text);
                            }
                        }
                    });
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '4. 进度框',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                text: '显示进度',
                handler: function () {
                    var progressBar = null;
                    var count = 0;

                    var updateProgress = function () {
                        count++;
                        var value = count / 10;
                        progressBar.updateProgress(value, Math.round(value * 100) + '%');

                        if (count < 10) {
                            setTimeout(updateProgress, 500);
                        } else {
                            setTimeout(function () {
                                progressBar.hide();
                                Ext.Msg.alert('提示', '操作完成!');
                            }, 500);
                        }
                    };

                    progressBar = Ext.Msg.show({
                        title: '请稍候',
                        message: '正在处理...',
                        width: 300,
                        progress: true,
                        buttons: false
                    });

                    updateProgress();
                }
            }, {
                xtype: 'button',
                text: '显示等待',
                handler: function () {
                    var wait = Ext.Msg.wait('正在加载数据...', '请稍候');

                    setTimeout(function () {
                        wait.hide();
                        Ext.Msg.alert('提示', '数据加载完成!');
                    }, 3000);
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '5. 自定义消息框',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                text: '自定义按钮',
                handler: function () {
                    Ext.Msg.show({
                        title: '自定义',
                        message: '请选择一个操作:',
                        buttons: [{
                            text: '保存',
                            itemId: 'save'
                        }, {
                            text: '不保存',
                            itemId: 'discard'
                        }, {
                            text: '取消',
                            itemId: 'cancel'
                        }],
                        fn: function (btn) {
                            Ext.Msg.alert('提示', '您点击了"' + btn + '"按钮');
                        }
                    });
                }
            }, {
                xtype: 'button',
                text: '自定义样式',
                handler: function () {
                    Ext.Msg.show({
                        title: '自定义样式',
                        message: '这是一个自定义样式的消息框',
                        buttons: Ext.Msg.OK,
                        buttonText: {
                            ok: '知道了'
                        },
                        icon: Ext.Msg.INFO,
                        cls: 'custom-msgbox',
                        width: 300
                    });
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
                '<p><strong>MessageBox</strong>组件提供了丰富的消息框功能:</p>' +
                '<ul>' +
                '<li>基本消息框: 信息、警告、错误、问题等</li>' +
                '<li>确认框: 是/否、是/否/取消等</li>' +
                '<li>输入框: 单行输入、多行输入等</li>' +
                '<li>进度框: 进度条、等待提示等</li>' +
                '<li>自定义消息框: 自定义按钮、样式等</li>' +
                '</ul>' +
                '<p>消息框组件提供了良好的用户交互体验。</p>' +
                '</div>'
        }]
    }
});