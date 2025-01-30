Ext.define('Demo.UtilDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Util 工具类演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    // 自定义事件
    customEvents: {
        mycustomevent: true
    },

    initComponent: function () {
        var me = this;

        // 创建延迟任务
        var delayedTask = new Ext.util.DelayedTask(function () {
            Ext.Msg.alert('提示', '延迟任务执行了!');
        });

        // 扩展配置
        Ext.apply(me, {
            items: [{
                xtype: 'panel',
                title: '1. DelayedTask 延迟任务',
                margin: '0 0 10 0',
                bodyPadding: 10,
                items: [{
                    xtype: 'button',
                    text: '延迟2秒执行',
                    handler: function () {
                        delayedTask.delay(2000);
                    }
                }, {
                    xtype: 'button',
                    text: '取消延迟任务',
                    margin: '0 0 0 10',
                    handler: function () {
                        delayedTask.cancel();
                        Ext.Msg.alert('提示', '延迟任务已取消');
                    }
                }]
            }, {
                xtype: 'panel',
                title: '2. Observable 事件观察者',
                margin: '0 0 10 0',
                bodyPadding: 10,
                items: [{
                    xtype: 'button',
                    text: '触发自定义事件',
                    handler: function () {
                        me.fireEvent('mycustomevent', '这是事件数据');
                    }
                }],
                listeners: {
                    render: function () {
                        // 添加自定义事件监听
                        me.on('mycustomevent', function (data) {
                            Ext.Msg.alert('提示', '收到自定义事件: ' + data);
                        });
                    }
                }
            }, {
                xtype: 'panel',
                title: '3. Format 格式化工具',
                margin: '0 0 10 0',
                bodyPadding: 10,
                defaults: {
                    xtype: 'displayfield',
                    labelWidth: 100,
                    margin: '0 0 5 0'
                },
                items: [{
                    fieldLabel: '数字格式化',
                    value: Ext.util.Format.number(1234.567, '0,000.00')
                }, {
                    fieldLabel: '货币格式化',
                    value: Ext.util.Format.currency(1234.567, '￥', 2)
                }, {
                    fieldLabel: '日期格式化',
                    value: Ext.util.Format.date(new Date(), 'Y-m-d H:i:s')
                }, {
                    fieldLabel: '文本截断',
                    value: Ext.util.Format.ellipsis('这是一段很长的文本需要被截断', 10)
                }, {
                    fieldLabel: '首字母大写',
                    value: Ext.util.Format.capitalize('hello world')
                }]
            }, {
                xtype: 'panel',
                title: '4. Ajax 请求',
                margin: '0 0 10 0',
                bodyPadding: 10,
                items: [{
                    xtype: 'button',
                    text: '发送GET请求',
                    handler: function () {
                        Ext.Ajax.request({
                            url: 'https://jsonplaceholder.typicode.com/posts/1',
                            method: 'GET',
                            success: function (response) {
                                var data = Ext.JSON.decode(response.responseText);
                                Ext.Msg.alert('成功', '请求成功:<br>' +
                                    Ext.util.Format.htmlEncode(Ext.JSON.encode(data, true)));
                            },
                            failure: function (response) {
                                Ext.Msg.alert('错误', '请求失败: ' + response.status);
                            }
                        });
                    }
                }, {
                    xtype: 'button',
                    text: '发送POST请求',
                    margin: '0 0 0 10',
                    handler: function () {
                        Ext.Ajax.request({
                            url: 'https://jsonplaceholder.typicode.com/posts',
                            method: 'POST',
                            jsonData: {
                                title: '测试标题',
                                body: '测试内容',
                                userId: 1
                            },
                            success: function (response) {
                                var data = Ext.JSON.decode(response.responseText);
                                Ext.Msg.alert('成功', '请求成功:<br>' +
                                    Ext.util.Format.htmlEncode(Ext.JSON.encode(data, true)));
                            },
                            failure: function (response) {
                                Ext.Msg.alert('错误', '请求失败: ' + response.status);
                            }
                        });
                    }
                }]
            }, {
                xtype: 'panel',
                title: '5. JSON 处理',
                margin: '0 0 10 0',
                bodyPadding: 10,
                items: [{
                    xtype: 'container',
                    html: '<div style="margin-bottom:10px">原始对象:</div>'
                }, {
                    xtype: 'textarea',
                    itemId: 'jsonInput',
                    width: '100%',
                    height: 100,
                    value: JSON.stringify({
                        name: '张三',
                        age: 30,
                        hobbies: ['读书', '游泳'],
                        address: {
                            city: '北京',
                            street: '朝阳路'
                        }
                    }, null, 2)
                }, {
                    xtype: 'container',
                    margin: '10 0',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    defaults: {
                        xtype: 'button',
                        margin: '0 5'
                    },
                    items: [{
                        text: '格式化',
                        handler: function () {
                            var textarea = this.up('panel').down('#jsonInput');
                            try {
                                var obj = Ext.JSON.decode(textarea.getValue());
                                textarea.setValue(Ext.JSON.encode(obj, true));
                            } catch (e) {
                                Ext.Msg.alert('错误', '无效的JSON格式');
                            }
                        }
                    }, {
                        text: '压缩',
                        handler: function () {
                            var textarea = this.up('panel').down('#jsonInput');
                            try {
                                var obj = Ext.JSON.decode(textarea.getValue());
                                textarea.setValue(Ext.JSON.encode(obj));
                            } catch (e) {
                                Ext.Msg.alert('错误', '无效的JSON格式');
                            }
                        }
                    }]
                }]
            }]
        });

        me.callParent();
    },

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Util</strong>工具类提供了许多实用功能:</p>' +
                '<ul>' +
                '<li><strong>DelayedTask</strong>: 延迟执行任务</li>' +
                '<li><strong>Observable</strong>: 实现事件机制</li>' +
                '<li><strong>Format</strong>: 数据格式化</li>' +
                '<li><strong>Ajax</strong>: 发送AJAX请求</li>' +
                '<li><strong>JSON</strong>: JSON数据处理</li>' +
                '</ul>' +
                '<p>这些工具类可以帮助我们更方便地处理常见的编程任务。</p>' +
                '</div>'
        }]
    }
}); 