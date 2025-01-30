Ext.define('Demo.DragDropDemo', {
    extend: 'Ext.panel.Panel',

    title: 'DragDrop 拖放功能演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'panel',
        title: '1. 基本拖放',
        margin: '0 0 10 0',
        layout: 'hbox',
        items: [{
            xtype: 'panel',
            title: '源面板',
            width: 200,
            height: 200,
            margin: '0 10 0 0',
            bodyPadding: 10,
            html: '<div class="drag-source" style="border: 1px solid #ccc; padding: 10px; margin: 5px; cursor: move;">拖动我</div>' +
                '<div class="drag-source" style="border: 1px solid #ccc; padding: 10px; margin: 5px; cursor: move;">也可以拖动我</div>',
            listeners: {
                render: function (p) {
                    var dragSource = new Ext.drag.Source({
                        element: p.body,
                        handle: '.drag-source',
                        constrain: {
                            element: true
                        },
                        proxy: {
                            type: 'placeholder',
                            cls: 'drag-proxy'
                        }
                    });
                }
            }
        }, {
            xtype: 'panel',
            title: '目标面板',
            flex: 1,
            height: 200,
            bodyPadding: 10,
            html: '<div style="border: 2px dashed #ccc; padding: 20px; text-align: center;">放置区域</div>',
            listeners: {
                render: function (p) {
                    var dropTarget = new Ext.drag.Target({
                        element: p.body,
                        validCls: 'drop-target-valid',
                        invalidCls: 'drop-target-invalid',
                        listeners: {
                            drop: function (target, info) {
                                var draggedElement = info.source.getElement().dom;
                                var clone = draggedElement.cloneNode(true);
                                p.body.appendChild(clone);
                            }
                        }
                    });
                }
            }
        }]
    }, {
        xtype: 'panel',
        title: '2. 列表排序',
        margin: '0 0 10 0',
        items: [{
            xtype: 'dataview',
            height: 300,
            store: {
                fields: ['id', 'name', 'description'],
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
                }, {
                    id: 4,
                    name: '项目4',
                    description: '这是项目4的描述'
                }]
            },
            itemTpl: '<div class="draggable-item" style="border: 1px solid #ccc; padding: 10px; margin: 5px; cursor: move;">' +
                '<div class="item-name">{name}</div>' +
                '<div class="item-description">{description}</div>' +
                '</div>',
            itemSelector: '.draggable-item',
            plugins: {
                ptype: 'gridviewdragdrop',
                dragText: '移动项目到新位置'
            }
        }]
    }, {
        xtype: 'panel',
        title: '3. 分组拖放',
        margin: '0 0 10 0',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        height: 300,
        defaults: {
            xtype: 'panel',
            flex: 1,
            margin: '0 5',
            bodyPadding: 10
        },
        items: [{
            title: '待处理',
            itemId: 'todo',
            html: '<div class="task-list">' +
                '<div class="task-item" draggable="true">任务1</div>' +
                '<div class="task-item" draggable="true">任务2</div>' +
                '<div class="task-item" draggable="true">任务3</div>' +
                '</div>',
            listeners: {
                render: function (p) {
                    this.initDragDrop(p, 'todo');
                }
            }
        }, {
            title: '进行中',
            itemId: 'inProgress',
            html: '<div class="task-list"></div>',
            listeners: {
                render: function (p) {
                    this.initDragDrop(p, 'inProgress');
                }
            }
        }, {
            title: '已完成',
            itemId: 'done',
            html: '<div class="task-list"></div>',
            listeners: {
                render: function (p) {
                    this.initDragDrop(p, 'done');
                }
            }
        }],
        initDragDrop: function (panel, group) {
            var dragSource = new Ext.drag.Source({
                element: panel.body,
                handle: '.task-item',
                constrain: {
                    element: true
                },
                proxy: {
                    type: 'placeholder',
                    cls: 'task-proxy'
                },
                groups: [group]
            });

            var dropTarget = new Ext.drag.Target({
                element: panel.body,
                validCls: 'task-target-valid',
                invalidCls: 'task-target-invalid',
                groups: ['todo', 'inProgress', 'done'],
                listeners: {
                    drop: function (target, info) {
                        var draggedElement = info.source.getElement().dom;
                        var taskList = panel.body.down('.task-list');
                        if (draggedElement.parentNode !== taskList) {
                            taskList.appendChild(draggedElement.cloneNode(true));
                            draggedElement.parentNode.removeChild(draggedElement);
                        }
                    }
                }
            });
        }
    }, {
        xtype: 'panel',
        title: '4. 文件上传模拟',
        margin: '0 0 10 0',
        height: 200,
        html: '<div class="file-drop-zone" style="border: 3px dashed #ccc; padding: 20px; text-align: center; height: 100px;">' +
            '拖放文件到此处上传' +
            '</div>',
        listeners: {
            render: function (p) {
                var el = p.body.down('.file-drop-zone');

                el.dom.addEventListener('dragover', function (e) {
                    e.preventDefault();
                    el.addCls('file-drop-hover');
                });

                el.dom.addEventListener('dragleave', function (e) {
                    e.preventDefault();
                    el.removeCls('file-drop-hover');
                });

                el.dom.addEventListener('drop', function (e) {
                    e.preventDefault();
                    el.removeCls('file-drop-hover');

                    var files = e.dataTransfer.files;
                    var fileNames = [];
                    for (var i = 0; i < files.length; i++) {
                        fileNames.push(files[i].name);
                    }

                    if (fileNames.length > 0) {
                        Ext.Msg.alert('文件上传', '模拟上传文件：' + fileNames.join(', '));
                    }
                });
            }
        }
    }, {
        xtype: 'panel',
        title: '5. 购物车模拟',
        margin: '0 0 10 0',
        layout: 'hbox',
        items: [{
            xtype: 'panel',
            title: '商品列表',
            width: 300,
            height: 300,
            margin: '0 10 0 0',
            bodyPadding: 10,
            html: '<div class="product-list">' +
                '<div class="product-item" draggable="true" data-price="99.00">商品1 - ￥99.00</div>' +
                '<div class="product-item" draggable="true" data-price="199.00">商品2 - ￥199.00</div>' +
                '<div class="product-item" draggable="true" data-price="299.00">商品3 - ￥299.00</div>' +
                '</div>',
            listeners: {
                render: function (p) {
                    var dragSource = new Ext.drag.Source({
                        element: p.body,
                        handle: '.product-item',
                        proxy: {
                            type: 'placeholder',
                            cls: 'product-proxy'
                        }
                    });
                }
            }
        }, {
            xtype: 'panel',
            title: '购物车',
            flex: 1,
            height: 300,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'panel',
                flex: 1,
                bodyPadding: 10,
                html: '<div class="cart-items"></div>',
                listeners: {
                    render: function (p) {
                        var dropTarget = new Ext.drag.Target({
                            element: p.body,
                            validCls: 'cart-target-valid',
                            invalidCls: 'cart-target-invalid',
                            listeners: {
                                drop: function (target, info) {
                                    var draggedElement = info.source.getElement().dom;
                                    var cartItems = p.body.down('.cart-items');
                                    var clone = draggedElement.cloneNode(true);
                                    cartItems.appendChild(clone);

                                    // 更新总价
                                    var items = cartItems.dom.getElementsByClassName('product-item');
                                    var total = 0;
                                    for (var i = 0; i < items.length; i++) {
                                        total += parseFloat(items[i].getAttribute('data-price'));
                                    }

                                    var totalPanel = p.up('panel').down('#totalPanel');
                                    totalPanel.update('总计: ￥' + total.toFixed(2));
                                }
                            }
                        });
                    }
                }
            }, {
                xtype: 'panel',
                itemId: 'totalPanel',
                height: 30,
                bodyPadding: 5,
                html: '总计: ￥0.00'
            }]
        }]
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>DragDrop</strong>功能提供了丰富的拖放操作:</p>' +
                '<ul>' +
                '<li>基本拖放: 简单的元素拖放</li>' +
                '<li>列表排序: 支持列表项重新排序</li>' +
                '<li>分组拖放: 在不同分组间移动元素</li>' +
                '<li>文件上传: 模拟文件拖放上传</li>' +
                '<li>购物车: 模拟商品添加到购物车</li>' +
                '</ul>' +
                '<p>拖放功能可以提供更好的用户交互体验。</p>' +
                '</div>'
        }]
    }
}); 