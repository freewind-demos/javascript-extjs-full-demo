// 定义员工模型
if (!Ext.ClassManager.get('Demo.model.Employee')) {
    Ext.define('Demo.model.Employee', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' },
            { name: 'age', type: 'int' },
            { name: 'gender', type: 'string' },
            { name: 'department', type: 'string' },
            { name: 'position', type: 'string' },
            { name: 'salary', type: 'float' },
            { name: 'joinDate', type: 'date', dateFormat: 'Y-m-d' },
            { name: 'status', type: 'boolean' }
        ]
    });
}

Ext.define('Demo.GridDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Grid 表格演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    // 定义用户模型
    initComponent: function () {
        this.callParent();
    },

    items: [{
        xtype: 'panel',
        title: '1. 基本表格',
        margin: '0 0 10 0',
        items: [{
            xtype: 'grid',
            height: 200,
            store: {
                model: 'Demo.model.Employee',
                data: [{
                    id: 1,
                    name: '张三',
                    age: 28,
                    gender: '男',
                    department: '技术部',
                    position: '工程师',
                    salary: 10000,
                    joinDate: '2020-01-01',
                    status: true
                }, {
                    id: 2,
                    name: '李四',
                    age: 32,
                    gender: '女',
                    department: '市场部',
                    position: '经理',
                    salary: 15000,
                    joinDate: '2019-06-01',
                    status: true
                }]
            },
            columns: [
                { text: 'ID', dataIndex: 'id', width: 50 },
                { text: '姓名', dataIndex: 'name', flex: 1 },
                { text: '年龄', dataIndex: 'age', width: 60 },
                { text: '性别', dataIndex: 'gender', width: 60 },
                { text: '部门', dataIndex: 'department', flex: 1 },
                { text: '职位', dataIndex: 'position', flex: 1 },
                {
                    text: '薪资', dataIndex: 'salary', width: 100,
                    renderer: function (value) {
                        return '￥' + Ext.util.Format.number(value, '0,000');
                    }
                },
                {
                    text: '入职日期', dataIndex: 'joinDate', width: 100,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d')
                },
                {
                    text: '状态', dataIndex: 'status', width: 60,
                    renderer: function (value) {
                        return value ? '在职' : '离职';
                    }
                }
            ]
        }]
    }, {
        xtype: 'panel',
        title: '2. 高级功能',
        margin: '0 0 10 0',
        items: [{
            xtype: 'grid',
            height: 300,
            store: {
                model: 'Demo.model.Employee',
                data: [{
                    id: 1,
                    name: '张三',
                    age: 28,
                    gender: '男',
                    department: '技术部',
                    position: '工程师',
                    salary: 10000,
                    joinDate: '2020-01-01',
                    status: true
                }, {
                    id: 2,
                    name: '李四',
                    age: 32,
                    gender: '女',
                    department: '市场部',
                    position: '经理',
                    salary: 15000,
                    joinDate: '2019-06-01',
                    status: true
                }, {
                    id: 3,
                    name: '王五',
                    age: 35,
                    gender: '男',
                    department: '技术部',
                    position: '架构师',
                    salary: 20000,
                    joinDate: '2018-03-01',
                    status: true
                }]
            },
            selModel: {
                type: 'checkboxmodel'
            },
            features: [{
                ftype: 'grouping',
                groupHeaderTpl: '{name} ({rows.length}人)'
            }],
            plugins: [{
                ptype: 'rowediting',
                clicksToEdit: 2
            }],
            columns: [
                { text: 'ID', dataIndex: 'id', width: 50 },
                {
                    text: '姓名', dataIndex: 'name', flex: 1,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    text: '年龄', dataIndex: 'age', width: 60,
                    editor: {
                        xtype: 'numberfield',
                        minValue: 18,
                        maxValue: 65
                    }
                },
                {
                    text: '性别', dataIndex: 'gender', width: 60,
                    editor: {
                        xtype: 'combobox',
                        store: ['男', '女'],
                        queryMode: 'local'
                    }
                },
                {
                    text: '部门', dataIndex: 'department', flex: 1,
                    editor: {
                        xtype: 'combobox',
                        store: ['技术部', '市场部', '销售部', '人事部'],
                        queryMode: 'local'
                    }
                },
                {
                    text: '职位', dataIndex: 'position', flex: 1,
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    text: '薪资', dataIndex: 'salary', width: 100,
                    renderer: function (value) {
                        return '￥' + Ext.util.Format.number(value, '0,000');
                    },
                    editor: {
                        xtype: 'numberfield',
                        minValue: 0
                    }
                },
                {
                    text: '入职日期', dataIndex: 'joinDate', width: 100,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: {
                        xtype: 'datefield',
                        format: 'Y-m-d'
                    }
                },
                {
                    text: '状态', dataIndex: 'status', width: 60,
                    renderer: function (value) {
                        return value ? '在职' : '离职';
                    },
                    editor: {
                        xtype: 'checkbox',
                        inputValue: true
                    }
                }
            ],
            tbar: [{
                text: '添加',
                handler: function (btn) {
                    var grid = btn.up('grid');
                    var store = grid.getStore();
                    var rowEditing = grid.findPlugin('rowediting');

                    store.insert(0, {
                        id: store.getCount() + 1,
                        name: '',
                        age: 18,
                        gender: '男',
                        department: '技术部',
                        position: '',
                        salary: 0,
                        joinDate: new Date(),
                        status: true
                    });
                    rowEditing.startEdit(0, 1);
                }
            }, {
                text: '删除',
                handler: function (btn) {
                    var grid = btn.up('grid');
                    var selection = grid.getSelection();
                    if (selection.length) {
                        grid.getStore().remove(selection);
                    }
                }
            }, '->', {
                xtype: 'textfield',
                emptyText: '搜索...',
                width: 200,
                listeners: {
                    change: function (field, value) {
                        var grid = field.up('grid');
                        var store = grid.getStore();

                        if (value) {
                            store.filterBy(function (record) {
                                var name = record.get('name');
                                var department = record.get('department');
                                var position = record.get('position');
                                var searchValue = value.toLowerCase();

                                return name.toLowerCase().indexOf(searchValue) > -1 ||
                                    department.toLowerCase().indexOf(searchValue) > -1 ||
                                    position.toLowerCase().indexOf(searchValue) > -1;
                            });
                        } else {
                            store.clearFilter();
                        }
                    }
                }
            }],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                displayMsg: '显示 {0} - {1} 条，共 {2} 条',
                emptyMsg: "没有数据"
            }
        }]
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Grid</strong>组件提供了丰富的表格功能:</p>' +
                '<ul>' +
                '<li>基本功能: 列定义、数据绑定、格式化等</li>' +
                '<li>高级功能: 排序、分组、过滤、编辑等</li>' +
                '<li>选择模式: 单选、多选、复选框等</li>' +
                '<li>工具栏: 增删改查、搜索、分页等</li>' +
                '</ul>' +
                '<p>通过丰富的配置选项和插件机制,可以构建功能强大的数据表格。</p>' +
                '</div>'
        }]
    }
}); 