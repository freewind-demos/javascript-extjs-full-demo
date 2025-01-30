Ext.define('Demo.FormDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Form 表单演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'form',
        title: '1. 基本表单字段',
        bodyPadding: 10,
        margin: '0 0 10 0',
        defaults: {
            anchor: '100%',
            labelWidth: 100,
            margin: '0 0 10 0'
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: '文本字段',
            name: 'text',
            allowBlank: false,
            emptyText: '请输入文本'
        }, {
            xtype: 'numberfield',
            fieldLabel: '数字字段',
            name: 'number',
            value: 0,
            minValue: 0,
            maxValue: 100
        }, {
            xtype: 'textareafield',
            fieldLabel: '多行文本',
            name: 'description',
            grow: true
        }]
    }, {
        xtype: 'form',
        title: '2. 选择类字段',
        bodyPadding: 10,
        margin: '0 0 10 0',
        defaults: {
            anchor: '100%',
            labelWidth: 100,
            margin: '0 0 10 0'
        },
        items: [{
            xtype: 'combobox',
            fieldLabel: '下拉选择',
            name: 'combo',
            store: {
                fields: ['value', 'text'],
                data: [
                    { value: '1', text: '选项一' },
                    { value: '2', text: '选项二' },
                    { value: '3', text: '选项三' }
                ]
            },
            queryMode: 'local',
            displayField: 'text',
            valueField: 'value'
        }, {
            xtype: 'checkboxgroup',
            fieldLabel: '复选框组',
            columns: 2,
            items: [
                { boxLabel: '选项A', name: 'cb1', inputValue: '1' },
                { boxLabel: '选项B', name: 'cb2', inputValue: '2' },
                { boxLabel: '选项C', name: 'cb3', inputValue: '3' }
            ]
        }, {
            xtype: 'radiogroup',
            fieldLabel: '单选框组',
            columns: 2,
            items: [
                { boxLabel: '选项X', name: 'rb', inputValue: '1' },
                { boxLabel: '选项Y', name: 'rb', inputValue: '2' },
                { boxLabel: '选项Z', name: 'rb', inputValue: '3' }
            ]
        }]
    }, {
        xtype: 'form',
        title: '3. 日期时间字段',
        bodyPadding: 10,
        margin: '0 0 10 0',
        defaults: {
            anchor: '100%',
            labelWidth: 100,
            margin: '0 0 10 0'
        },
        items: [{
            xtype: 'datefield',
            fieldLabel: '日期字段',
            name: 'date',
            format: 'Y-m-d'
        }, {
            xtype: 'timefield',
            fieldLabel: '时间字段',
            name: 'time',
            format: 'H:i',
            increment: 30
        }]
    }, {
        xtype: 'form',
        title: '4. 表单验证和提交',
        bodyPadding: 10,
        margin: '0 0 10 0',
        defaults: {
            anchor: '100%',
            labelWidth: 100,
            margin: '0 0 10 0'
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: '用户名',
            name: 'username',
            allowBlank: false,
            minLength: 3,
            maxLength: 20
        }, {
            xtype: 'textfield',
            fieldLabel: '邮箱',
            name: 'email',
            vtype: 'email',
            allowBlank: false
        }, {
            xtype: 'numberfield',
            fieldLabel: '年龄',
            name: 'age',
            allowBlank: false,
            minValue: 18,
            maxValue: 100
        }],
        buttons: [{
            text: '重置',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }, {
            text: '提交',
            formBind: true,
            handler: function () {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    Ext.Msg.alert('成功', '表单验证通过!<br>表单数据:<br>' +
                        Ext.JSON.encode(form.getValues()));
                }
            }
        }]
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Form</strong>提供了丰富的表单功能:</p>' +
                '<ul>' +
                '<li>多种表单字段类型(文本、数字、日期等)</li>' +
                '<li>内置的数据验证机制</li>' +
                '<li>灵活的布局选项</li>' +
                '<li>表单数据的提交和加载</li>' +
                '<li>字段值的获取和设置</li>' +
                '</ul>' +
                '<p>表单组件通常与后端API配合,实现数据的录入和编辑功能。</p>' +
                '</div>'
        }]
    }
}); 