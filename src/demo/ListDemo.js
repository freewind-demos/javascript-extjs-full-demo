Ext.define('Demo.ListDemo', {
    extend: 'Ext.panel.Panel',

    title: 'List 列表组件演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    initComponent: function () {
        // 定义数据模型
        Ext.define('Demo.model.Contact', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'id', type: 'int' },
                { name: 'name', type: 'string' },
                { name: 'email', type: 'string' },
                { name: 'phone', type: 'string' },
                { name: 'avatar', type: 'string' },
                { name: 'online', type: 'boolean' },
                { name: 'department', type: 'string' },
                { name: 'position', type: 'string' },
                { name: 'status', type: 'string' },
                { name: 'lastSeen', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'priority', type: 'string' },
                { name: 'dueDate', type: 'string' }
            ]
        });

        this.callParent();
    },

    items: [{
        xtype: 'panel',
        title: '1. 基本列表',
        margin: '0 0 10 0',
        items: [{
            xtype: 'dataview',
            height: 200,
            scrollable: true,
            store: {
                model: 'Demo.model.Contact',
                data: [{
                    id: 1,
                    name: '张三',
                    email: 'zhangsan@example.com',
                    phone: '13800138000'
                }, {
                    id: 2,
                    name: '李四',
                    email: 'lisi@example.com',
                    phone: '13800138001'
                }, {
                    id: 3,
                    name: '王五',
                    email: 'wangwu@example.com',
                    phone: '13800138002'
                }]
            },
            itemTpl: [
                '<div class="contact-item">',
                '<div class="contact-name">{name}</div>',
                '<div class="contact-email">{email}</div>',
                '<div class="contact-phone">{phone}</div>',
                '</div>'
            ].join(''),
            itemSelector: '.contact-item',
            selectedItemCls: 'contact-item-selected',
            overItemCls: 'contact-item-over'
        }]
    }, {
        xtype: 'panel',
        title: '2. 分组列表',
        margin: '0 0 10 0',
        items: [{
            xtype: 'dataview',
            height: 300,
            scrollable: true,
            store: {
                model: 'Demo.model.Contact',
                groupField: 'department',
                data: [{
                    id: 1,
                    name: '张三',
                    department: '技术部',
                    position: '工程师',
                    avatar: 'https://via.placeholder.com/32'
                }, {
                    id: 2,
                    name: '李四',
                    department: '技术部',
                    position: '架构师',
                    avatar: 'https://via.placeholder.com/32'
                }, {
                    id: 3,
                    name: '王五',
                    department: '市场部',
                    position: '经理',
                    avatar: 'https://via.placeholder.com/32'
                }, {
                    id: 4,
                    name: '赵六',
                    department: '市场部',
                    position: '销售',
                    avatar: 'https://via.placeholder.com/32'
                }]
            },
            itemTpl: [
                '<div class="contact-item-group">',
                '<img src="{avatar}" class="contact-avatar">',
                '<div class="contact-info">',
                '<div class="contact-name">{name}</div>',
                '<div class="contact-position">{position}</div>',
                '</div>',
                '</div>'
            ].join(''),
            itemSelector: '.contact-item-group'
        }]
    }, {
        xtype: 'panel',
        title: '3. 在线状态列表',
        margin: '0 0 10 0',
        items: [{
            xtype: 'dataview',
            height: 300,
            scrollable: true,
            store: {
                model: 'Demo.model.Contact',
                data: [{
                    id: 1,
                    name: '张三',
                    status: '在线',
                    lastSeen: '刚刚',
                    online: true,
                    avatar: 'https://via.placeholder.com/32'
                }, {
                    id: 2,
                    name: '李四',
                    status: '离开',
                    lastSeen: '10分钟前',
                    online: false,
                    avatar: 'https://via.placeholder.com/32'
                }, {
                    id: 3,
                    name: '王五',
                    status: '在线',
                    lastSeen: '刚刚',
                    online: true,
                    avatar: 'https://via.placeholder.com/32'
                }]
            },
            itemTpl: [
                '<div class="contact-item-status">',
                '<img src="{avatar}" class="contact-avatar">',
                '<div class="contact-info">',
                '<div class="contact-name">{name}</div>',
                '<div class="contact-status {online ? \'online\' : \'offline\'}">{status}</div>',
                '<div class="contact-last-seen">{lastSeen}</div>',
                '</div>',
                '</div>'
            ].join(''),
            itemSelector: '.contact-item-status'
        }]
    }, {
        xtype: 'panel',
        title: '4. 可选择列表',
        margin: '0 0 10 0',
        items: [{
            xtype: 'dataview',
            height: 300,
            scrollable: true,
            selModel: {
                mode: 'MULTI'
            },
            store: {
                model: 'Demo.model.Contact',
                data: [{
                    id: 1,
                    name: '项目1',
                    description: '这是项目1的描述'
                }, {
                    id: 2,
                    name: '项目2',
                    description: '这是项目2的描述'
                }, {
                    id: 3,
                    name: '项目3',
                    description: '这是项目3的描述'
                }]
            },
            itemTpl: [
                '<div class="project-item">',
                '<div class="project-name">{name}</div>',
                '<div class="project-description">{description}</div>',
                '</div>'
            ].join(''),
            itemSelector: '.project-item',
            selectedItemCls: 'project-item-selected',
            tbar: [{
                text: '获取选中项',
                handler: function (btn) {
                    var dataview = btn.up('dataview');
                    var selection = dataview.getSelection();
                    var names = Ext.Array.map(selection, function (record) {
                        return record.get('name');
                    });
                    Ext.Msg.alert('选中项', '选中的项目: ' + names.join(', '));
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '5. 可排序列表',
        margin: '0 0 10 0',
        items: [{
            xtype: 'dataview',
            height: 300,
            scrollable: true,
            store: {
                model: 'Demo.model.Contact',
                sorters: [{
                    property: 'name',
                    direction: 'ASC'
                }],
                data: [{
                    id: 1,
                    name: '任务1',
                    priority: '高',
                    dueDate: '2024-01-01'
                }, {
                    id: 2,
                    name: '任务2',
                    priority: '中',
                    dueDate: '2024-01-02'
                }, {
                    id: 3,
                    name: '任务3',
                    priority: '低',
                    dueDate: '2024-01-03'
                }]
            },
            itemTpl: [
                '<div class="task-item">',
                '<div class="task-name">{name}</div>',
                '<div class="task-priority">优先级: {priority}</div>',
                '<div class="task-due-date">截止日期: {dueDate}</div>',
                '</div>'
            ].join(''),
            itemSelector: '.task-item',
            tbar: [{
                text: '按名称排序',
                handler: function (btn) {
                    var dataview = btn.up('dataview');
                    var store = dataview.getStore();
                    store.sort('name', 'ASC');
                }
            }, {
                text: '按优先级排序',
                handler: function (btn) {
                    var dataview = btn.up('dataview');
                    var store = dataview.getStore();
                    store.sort('priority', 'DESC');
                }
            }, {
                text: '按截止日期排序',
                handler: function (btn) {
                    var dataview = btn.up('dataview');
                    var store = dataview.getStore();
                    store.sort('dueDate', 'ASC');
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
                '<p><strong>List</strong>组件提供了丰富的列表功能:</p>' +
                '<ul>' +
                '<li>基本列表: 展示简单的数据列表</li>' +
                '<li>分组列表: 支持数据分组显示</li>' +
                '<li>在线状态列表: 展示用户状态</li>' +
                '<li>可选择列表: 支持单选和多选</li>' +
                '<li>可排序列表: 支持多种排序方式</li>' +
                '</ul>' +
                '<p>列表组件适用于展示各种类型的数据列表。</p>' +
                '</div>'
        }]
    }
}); 