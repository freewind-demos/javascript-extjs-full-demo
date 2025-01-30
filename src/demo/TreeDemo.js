Ext.define('Demo.TreeDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Tree 树形组件演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'panel',
        title: '1. 基本树',
        margin: '0 0 10 0',
        items: [{
            xtype: 'treepanel',
            height: 300,
            rootVisible: false,
            root: {
                expanded: true,
                children: [{
                    text: '文件夹1',
                    iconCls: 'x-fa fa-folder',
                    expanded: true,
                    children: [{
                        text: '文件1.txt',
                        iconCls: 'x-fa fa-file-text',
                        leaf: true
                    }, {
                        text: '文件2.doc',
                        iconCls: 'x-fa fa-file-word',
                        leaf: true
                    }]
                }, {
                    text: '文件夹2',
                    iconCls: 'x-fa fa-folder',
                    children: [{
                        text: '文件3.xls',
                        iconCls: 'x-fa fa-file-excel',
                        leaf: true
                    }, {
                        text: '文件4.pdf',
                        iconCls: 'x-fa fa-file-pdf',
                        leaf: true
                    }]
                }]
            }
        }]
    }, {
        xtype: 'panel',
        title: '2. 复选框树',
        margin: '0 0 10 0',
        items: [{
            xtype: 'treepanel',
            height: 300,
            rootVisible: false,
            useArrows: true,
            animate: true,
            plugins: [{
                ptype: 'bufferedrenderer'
            }],
            root: {
                expanded: true,
                children: [{
                    text: '系统管理',
                    expanded: true,
                    children: [{
                        text: '用户管理',
                        checked: false,
                        leaf: true
                    }, {
                        text: '角色管理',
                        checked: false,
                        leaf: true
                    }, {
                        text: '权限管理',
                        checked: false,
                        leaf: true
                    }]
                }, {
                    text: '内容管理',
                    expanded: true,
                    children: [{
                        text: '文章管理',
                        checked: false,
                        leaf: true
                    }, {
                        text: '评论管理',
                        checked: false,
                        leaf: true
                    }, {
                        text: '分类管理',
                        checked: false,
                        leaf: true
                    }]
                }]
            },
            viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    containerScroll: true
                }
            }
        }]
    }, {
        xtype: 'panel',
        title: '3. 异步加载树',
        margin: '0 0 10 0',
        items: [{
            xtype: 'treepanel',
            height: 300,
            rootVisible: false,
            store: {
                root: {
                    expanded: true,
                    children: [{
                        text: '部门1',
                        id: 'dept1',
                        leaf: false
                    }, {
                        text: '部门2',
                        id: 'dept2',
                        leaf: false
                    }]
                },
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json'
                    }
                }
            },
            listeners: {
                beforeexpand: function (node) {
                    if (!node.isLoaded() && !node.isLoading()) {
                        // 模拟异步加载
                        setTimeout(function () {
                            var children = [];
                            for (var i = 1; i <= 3; i++) {
                                children.push({
                                    text: node.get('text') + ' - 子部门' + i,
                                    id: node.get('id') + '_' + i,
                                    leaf: true
                                });
                            }
                            node.appendChild(children);
                        }, 500);
                    }
                }
            }
        }]
    }, {
        xtype: 'panel',
        title: '4. 可编辑树',
        margin: '0 0 10 0',
        items: [{
            xtype: 'treepanel',
            height: 300,
            rootVisible: false,
            plugins: [{
                ptype: 'cellediting',
                clicksToEdit: 2
            }],
            columns: [{
                xtype: 'treecolumn',
                text: '名称',
                dataIndex: 'text',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }, {
                text: '描述',
                dataIndex: 'description',
                flex: 1,
                editor: {
                    xtype: 'textfield'
                }
            }, {
                text: '创建时间',
                dataIndex: 'createTime',
                width: 150,
                editor: {
                    xtype: 'datefield',
                    format: 'Y-m-d'
                }
            }],
            root: {
                expanded: true,
                children: [{
                    text: '项目1',
                    description: '这是项目1',
                    createTime: '2024-01-01',
                    expanded: true,
                    children: [{
                        text: '任务1',
                        description: '这是任务1',
                        createTime: '2024-01-02',
                        leaf: true
                    }, {
                        text: '任务2',
                        description: '这是任务2',
                        createTime: '2024-01-03',
                        leaf: true
                    }]
                }, {
                    text: '项目2',
                    description: '这是项目2',
                    createTime: '2024-01-04',
                    children: [{
                        text: '任务3',
                        description: '这是任务3',
                        createTime: '2024-01-05',
                        leaf: true
                    }, {
                        text: '任务4',
                        description: '这是任务4',
                        createTime: '2024-01-06',
                        leaf: true
                    }]
                }]
            },
            tbar: [{
                text: '添加节点',
                handler: function (btn) {
                    var tree = btn.up('treepanel');
                    var selection = tree.getSelection()[0];
                    var parentNode = selection ? (selection.get('leaf') ? selection.parentNode : selection) : tree.getRootNode();

                    var newNode = parentNode.appendChild({
                        text: '新节点',
                        description: '新建节点',
                        createTime: Ext.Date.format(new Date(), 'Y-m-d'),
                        leaf: true
                    });

                    tree.getPlugin('cellediting').startEdit(newNode, 0);
                }
            }, {
                text: '删除节点',
                handler: function (btn) {
                    var tree = btn.up('treepanel');
                    var selection = tree.getSelection()[0];

                    if (selection) {
                        selection.remove();
                    }
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '5. 过滤树',
        margin: '0 0 10 0',
        items: [{
            xtype: 'treepanel',
            height: 300,
            rootVisible: false,
            useArrows: true,
            root: {
                expanded: true,
                children: [{
                    text: '技术部',
                    expanded: true,
                    children: [{
                        text: '开发组',
                        expanded: true,
                        children: [{
                            text: '张三',
                            position: '高级工程师',
                            leaf: true
                        }, {
                            text: '李四',
                            position: '工程师',
                            leaf: true
                        }]
                    }, {
                        text: '测试组',
                        expanded: true,
                        children: [{
                            text: '王五',
                            position: '测试主管',
                            leaf: true
                        }, {
                            text: '赵六',
                            position: '测试工程师',
                            leaf: true
                        }]
                    }]
                }, {
                    text: '市场部',
                    expanded: true,
                    children: [{
                        text: '销售组',
                        expanded: true,
                        children: [{
                            text: '钱七',
                            position: '销售经理',
                            leaf: true
                        }, {
                            text: '孙八',
                            position: '销售代表',
                            leaf: true
                        }]
                    }]
                }]
            },
            tbar: [{
                xtype: 'textfield',
                emptyText: '输入关键字过滤...',
                width: 200,
                listeners: {
                    change: {
                        buffer: 250,
                        fn: function (field, value) {
                            var tree = field.up('treepanel');
                            var store = tree.getStore();

                            if (value) {
                                var filterFn = function (node) {
                                    var children = node.childNodes;
                                    var len = children && children.length;

                                    // 如果节点有子节点，递归检查
                                    var hasMatchingChild = false;
                                    if (len) {
                                        for (var i = 0; i < len; i++) {
                                            if (filterFn(children[i])) {
                                                hasMatchingChild = true;
                                            }
                                        }
                                    }

                                    // 检查当前节点
                                    var match = node.get('text').toLowerCase().indexOf(value.toLowerCase()) > -1 ||
                                        (node.get('position') && node.get('position').toLowerCase().indexOf(value.toLowerCase()) > -1);

                                    return match || hasMatchingChild;
                                };

                                store.filterBy(filterFn);
                            } else {
                                store.clearFilter();
                            }
                        }
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
                '<p><strong>Tree</strong>组件提供了丰富的树形功能:</p>' +
                '<ul>' +
                '<li>基本树: 展示层级结构数据</li>' +
                '<li>复选框树: 支持节点选择</li>' +
                '<li>异步加载树: 支持数据懒加载</li>' +
                '<li>可编辑树: 支持节点编辑</li>' +
                '<li>过滤树: 支持节点过滤</li>' +
                '</ul>' +
                '<p>树形组件适用于展示和管理层级结构数据。</p>' +
                '</div>'
        }]
    }
}); 