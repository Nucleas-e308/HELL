addLayer("k", {
    name: "k", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "K", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        time: new Decimal(100),
        shuzhi: new Decimal(0),
        shitou: new Decimal(0),
        didian: new Decimal(0),
        y: new Decimal(2),
        jixie: new Decimal(20),
        zuizhong: new Decimal(0),
        daojishi: new Decimal(20),
        jiange: new Decimal(5),
        flag: new Decimal(1),
        cmm: new Decimal(0),
        mmm: new Decimal(0),
        flagg: new Decimal(1),
        mmmm: new Decimal(0),
        www: new Decimal(0),
    }},
    color: "#FFFF00",
    requires: new Decimal(1e308), // Can be a function that takes requirement increases into account
    resource: "寄点", // Name of prestige currency
    baseResource: "乐子", // Name of resource prestige is based on
	branches: ["x"],
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "1", description: "1", onPress(){if(Math.floor(player.k.mmm)%10!=1){layerDataReset("k");showTab('none')}else{player.points=new Decimal(1e308)}}},
        {key: "2", description: "2", onPress(){if(Math.floor(player.k.mmm)%10!=2){layerDataReset("k");showTab('none')}else{player.points=new Decimal(1e308)}}},
        {key: "3", description: "3", onPress(){if(Math.floor(player.k.mmm)%10!=3){layerDataReset("k");showTab('none')}else{player.points=new Decimal(1e308)}}},
        {key: "4", description: "4", onPress(){if(Math.floor(player.k.mmm)%10!=4){layerDataReset("k");showTab('none')}else{player.points=new Decimal(1e308)}}},
        {key: "5", description: "5", onPress(){if(Math.floor(player.k.mmm)%10!=5){layerDataReset("k");showTab('none')}else{player.points=new Decimal(1e308)}}},
        {key: "6", description: "6", onPress(){if(Math.floor(player.k.mmm)%10!=6){layerDataReset("k");showTab('none')}else{player.points=new Decimal(1e308)}}},
        {key: "7", description: "7", onPress(){if(Math.floor(player.k.mmm)%10!=7){layerDataReset("k");showTab('none')}else{player.points=new Decimal(1e308)}}},
        {key: "8", description: "8", onPress(){if(Math.floor(player.k.mmm)%10!=8){layerDataReset("k");showTab('none')}else{player.points=new Decimal(1e308)}}},
        {key: "9", description: "9", onPress(){if(Math.floor(player.k.mmm)%10!=9){layerDataReset("k");showTab('none')}else{player.points=new Decimal(1e308)}}},
        {key: "0", description: "0", onPress(){if(Math.floor(player.k.mmm)%10!=0){layerDataReset("k");showTab('none')}else{player.points=new Decimal(1e308)}}},
    ],
    update(diff) {
		generatePoints("k", this.revenue(diff))
	},
    layerShown(){return true},
	clickables:{
    11:{
        display() {
            return "拾荒<br>消耗2体力"
        },
        unlocked(){return true},
        style(){return {"height":"125px"}},
        canClick(){return true},
        onClick(){
            if(player.k.didian==0){
                player.k.shuzhi=player.k.shuzhi.add(1)
                player.k.time=player.k.time.sub(2)
            }
            else if(player.k.didian==1){
                player.k.shitou=player.k.shitou.add(1)
                player.k.time=player.k.time.sub(2)
            }
        }
    },
    12:{
        display() {
            return "去森林<br>消耗1体力"
        },
        unlocked(){return true},
        style(){return {"height":"125px"}},
        canClick(){return true},
        onClick(){
            player.k.time=player.k.time.sub(1)
            player.k.didian=0
        }
    },
    13:{
        display() {
            return "去溪边<br>消耗1体力"
        },
        unlocked(){return true},
        style(){return {"height":"125px"}},
        canClick(){return true},
        onClick(){
            player.k.time=player.k.time.sub(1)
            player.k.didian=1
        }
    },
    14:{
        display() {
            return "制作机器<br>消耗7树枝，7石头，20时间<br>2机器以解锁新模块"
        },
        unlocked(){return true},
        style(){return {"height":"125px"}},
        canClick(){return player.k.shuzhi.gte(7)&&player.k.shitou.gte(7)},
        onClick(){
            player.k.time=player.k.time.sub(20)
            player.k.shitou=player.k.shitou.sub(7)
            player.k.shuzhi=player.k.shuzhi.sub(7)
            player.k.zuizhong=player.k.zuizhong.add(1)
        }
    },
    21:{
        display() {
            if(player.k.flag==1){
                player.k.flag=0
                player.k.cmm = Math.floor(Math.random() * 2)
                let ww = Math.floor(Math.random() * 2)
                player.k.www=ww
            }
            if(player.k.cmm==1){
                if(player.k.www==0){return "我不执意不在不重置的情况前不重置" + "倒计时" + format(player.k.daojishi)}
                else{return "难道不得不非不重置不可吗？" + "倒计时" + format(player.k.daojishi)}
            }
            else{
                if(player.k.www==0){return "我无法选择在重置前非不重置不可" + "倒计时" + format(player.k.daojishi)}
                else{return "难道不选择不得不重置前绝对不非不重置不可吗？" + "倒计时" + format(player.k.daojishi)}
            }
        },
        unlocked(){return true},
        style(){return {"height":"125px"}},
        canClick(){return false},
    },
    31:{
        display() {
            return "距离硬重置还有" + format(player.k.jixie)
        },
        unlocked(){return true},
        style(){return {"height":"125px"}},
        canClick(){return true},
        onClick(){
            player.k.jixie=player.k.jixie.add(0.75)
        }
    },
    32:{
        display() {
            return "是"
        },
        unlocked(){return true},
        style(){return {"height":"125px"}},
        canClick(){return player.k.daojishi<21},
        onClick(){
            if(player.k.cmm==0){
                layerDataReset("k")
            }
            else{
                player.k.daojishi=new Decimal(20)
            }
        }
    },
    33:{
        display() {
            return "否"
        },
        unlocked(){return true},
        style(){return {"height":"125px"}},
        canClick(){return player.k.daojishi<21},
        onClick(){
            if(player.k.cmm==0){
                player.k.daojishi=new Decimal(20)
            }
            else{
                layerDataReset("k")
            }
        }
    },
    41:{
        display() {
                if(player.k.flagg==1){
                    player.k.flagg=0
                    player.k.mmmm = new Decimal(Math.floor(Math.random() * 10))
                    player.k.mmm = new Decimal(player.k.mmmm.pow(5))
                }
                return "请输入" + format(player.k.mmmm) + "的5次方的个位"
        },
        unlocked(){return true},
        style(){return {"height":"125px"}},
        canClick(){return false},
    },
    },
    tabFormat: {
        行动: {
            content:["blank",
            ["display-text",
                function() { return '你有' + format(player.k.time) + '时间'},
                { "color": "gold", "font-size": "24px",}
            ],
            ["display-text",
                function() { return '你有' + format(player.k.shuzhi) + '树枝'},
                { "color": "#97694F", "font-size": "24px",}
            ],
            ["display-text",
                function() { return '你有' + format(player.k.shitou) + '石头'},
                { "color": "#545454", "font-size": "24px",}
            ],
            "blank",
            "blank",
            "blank",
            ["row",[["clickable", 11],["clickable", 12],["clickable", 13],["clickable", 14]]],
            ],
        },
        机械: {
            content:["blank",
            "blank",
            "blank",
            "blank",
            ["row",[ ["clickable", 31]],],
            ],
        },
        高级机械: {
            content:["blank",
            "blank",
            "blank",
            "blank",
            ["row",[ ["clickable", 21],["clickable", 32],["clickable", 33]],],
            ],
        },
        最终: {
            unlocked(){return player.k.zuizhong.gte(2)},
            content:["blank",
            "blank",
            "blank",
            "blank",
            ["row",[ ["clickable", 41]],],
            ],
        },
    },
    revenue(diff) {
        player.k.time=player.k.time.sub(0.003)
        player.k.jixie=player.k.jixie.sub(0.05)
        player.k.jiange=player.k.jiange.sub(0.025)
        player.k.daojishi=player.k.daojishi.sub(0.025)
        if(player.k.jiange<0){
            player.k.flag=1
            player.k.jiange=new Decimal(20)
        }
        if(player.k.daojishi<0){
            layerDataReset("k")
            showTab('none')
        }
        if(player.k.time<0){
            layerDataReset("k")
            showTab('none')
        }
        if(player.k.jixie<0){
            layerDataReset("k")
            showTab('none')
        }
    },
})