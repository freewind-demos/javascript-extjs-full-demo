Ext.define('Demo.ValidationDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Validation 表单验证演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'panel',
        title: '1. 基本验证',
        margin: '0 0 10 0',
        items: [{
            xtype: 'form',
            padding: 10,
            items: [{
                xtype: 'textfield',
                fieldLabel: '必填字段',
                name: 'required',
                allowBlank: false,
                blankText: '此字段不能为空'
            }, {
                xtype: 'textfield',
                fieldLabel: '最小长度',
                name: 'minLength',
                minLength: 3,
                minLengthText: '最小长度为3个字符'
            }, {
                xtype: 'textfield',
                fieldLabel: '最大长度',
                name: 'maxLength',
                maxLength: 10,
                maxLengthText: '最大长度为10个字符',
                enforceMaxLength: true
            }],
            buttons: [{
                text: '验证',
                handler: function (btn) {
                    var form = btn.up('form');
                    if (form.isValid()) {
                        Ext.Msg.alert('成功', '表单验证通过!');
                    } else {
                        Ext.Msg.alert('错误', '请检查表单填写是否正确');
                    }
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '2. 格式验证',
        margin: '0 0 10 0',
        items: [{
            xtype: 'form',
            padding: 10,
            items: [{
                xtype: 'textfield',
                fieldLabel: '邮箱',
                name: 'email',
                vtype: 'email',
                vtypeText: '请输入有效的邮箱地址'
            }, {
                xtype: 'textfield',
                fieldLabel: '网址',
                name: 'url',
                vtype: 'url',
                vtypeText: '请输入有效的网址'
            }, {
                xtype: 'textfield',
                fieldLabel: '字母数字',
                name: 'alphanum',
                vtype: 'alphanum',
                vtypeText: '只能输入字母和数字'
            }],
            buttons: [{
                text: '验证',
                handler: function (btn) {
                    var form = btn.up('form');
                    if (form.isValid()) {
                        Ext.Msg.alert('成功', '表单验证通过!');
                    } else {
                        Ext.Msg.alert('错误', '请检查表单填写是否正确');
                    }
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '3. 自定义验证',
        margin: '0 0 10 0',
        items: [{
            xtype: 'form',
            padding: 10,
            items: [{
                xtype: 'textfield',
                fieldLabel: '密码',
                name: 'password',
                inputType: 'password',
                allowBlank: false
            }, {
                xtype: 'textfield',
                fieldLabel: '确认密码',
                name: 'confirmPassword',
                inputType: 'password',
                allowBlank: false,
                validator: function (value) {
                    var password = this.up('form').getForm().findField('password');
                    return (value === password.getValue()) ? true : '两次输入的密码不一致';
                }
            }, {
                xtype: 'numberfield',
                fieldLabel: '年龄',
                name: 'age',
                minValue: 18,
                maxValue: 100,
                validator: function (value) {
                    if (value < 18) {
                        return '年龄必须大于等于18岁';
                    }
                    if (value > 100) {
                        return '年龄必须小于等于100岁';
                    }
                    return true;
                }
            }],
            buttons: [{
                text: '验证',
                handler: function (btn) {
                    var form = btn.up('form');
                    if (form.isValid()) {
                        Ext.Msg.alert('成功', '表单验证通过!');
                    } else {
                        Ext.Msg.alert('错误', '请检查表单填写是否正确');
                    }
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '4. 远程验证',
        margin: '0 0 10 0',
        items: [{
            xtype: 'form',
            padding: 10,
            items: [{
                xtype: 'textfield',
                fieldLabel: '用户名',
                name: 'username',
                allowBlank: false,
                // 模拟远程验证
                validator: function (value) {
                    var field = this;
                    if (!value) return true;

                    // 清除之前的验证任务
                    if (this.validationTask) {
                        this.validationTask.cancel();
                    }

                    // 创建新的验证任务
                    this.validationTask = new Ext.util.DelayedTask(function () {
                        // 模拟AJAX请求
                        setTimeout(function () {
                            var isValid = value !== 'admin';
                            if (!isValid) {
                                field.markInvalid('用户名已被使用');
                            } else {
                                field.clearInvalid();
                            }
                        }, 500);
                    });

                    // 延迟执行验证
                    this.validationTask.delay(500);
                    return true;
                }
            }],
            buttons: [{
                text: '验证',
                handler: function (btn) {
                    var form = btn.up('form');
                    if (form.isValid()) {
                        Ext.Msg.alert('成功', '表单验证通过!');
                    } else {
                        Ext.Msg.alert('错误', '请检查表单填写是否正确');
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
                '<p><strong>Validation</strong>提供了丰富的表单验证功能:</p>' +
                '<ul>' +
                '<li>基本验证: 必填、长度限制等</li>' +
                '<li>格式验证: 邮箱、网址、字母数字等</li>' +
                '<li>自定义验证: 通过validator函数实现自定义验证逻辑</li>' +
                '<li>远程验证: 支持异步验证，如检查用户名是否可用</li>' +
                '</ul>' +
                '<p>验证结果会以醒目的方式显示，并支持自定义错误提示信息。</p>' +
                '</div>'
        }]
    }
}); 