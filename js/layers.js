addLayer("k", {
    name: "k", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "K", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        time: new Decimal(200),
        shuzhi: new Decimal(0),
        shitou: new Decimal(0),
        didian: new Decimal(0),
        y: new Decimal(2),
        jixie: new Decimal(20),
        zuizhong: new Decimal(0),
        daojishi: new Decimal(20),
        jiange: new Decimal(30),
        flag: new Decimal(1),
        cmm: new Decimal(0),
        mmm: new Decimal(0),
        flagg: new Decimal(1),
        mmmm: new Decimal(0),
        www: new Decimal(0),
        sflag: new Decimal(0),
        tflag: new Decimal(0),
        tie: new Decimal(0),
        gu: new Decimal(0),
        wu: new Decimal(0),
        wflag: new Decimal(0),
        gflag: new Decimal(0),
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
        {key: "1", description: "1", onPress(){if(Math.floor(player.k.mmm)%10!=1){layerDataReset("k");showTab('none');player.points=new Decimal(0)}else{player.points=new Decimal(1e308)}}},
        {key: "2", description: "2", onPress(){if(Math.floor(player.k.mmm)%10!=2){layerDataReset("k");showTab('none');player.points=new Decimal(0)}else{player.points=new Decimal(1e308)}}},
        {key: "3", description: "3", onPress(){if(Math.floor(player.k.mmm)%10!=3){layerDataReset("k");showTab('none');player.points=new Decimal(0)}else{player.points=new Decimal(1e308)}}},
        {key: "4", description: "4", onPress(){if(Math.floor(player.k.mmm)%10!=4){layerDataReset("k");showTab('none');player.points=new Decimal(0)}else{player.points=new Decimal(1e308)}}},
        {key: "5", description: "5", onPress(){if(Math.floor(player.k.mmm)%10!=5){layerDataReset("k");showTab('none');player.points=new Decimal(0)}else{player.points=new Decimal(1e308)}}},
        {key: "6", description: "6", onPress(){if(Math.floor(player.k.mmm)%10!=6){layerDataReset("k");showTab('none');player.points=new Decimal(0)}else{player.points=new Decimal(1e308)}}},
        {key: "7", description: "7", onPress(){if(Math.floor(player.k.mmm)%10!=7){layerDataReset("k");showTab('none');player.points=new Decimal(0)}else{player.points=new Decimal(1e308)}}},
        {key: "8", description: "8", onPress(){if(Math.floor(player.k.mmm)%10!=8){layerDataReset("k");showTab('none');player.points=new Decimal(0)}else{player.points=new Decimal(1e308)}}},
        {key: "9", description: "9", onPress(){if(Math.floor(player.k.mmm)%10!=9){layerDataReset("k");showTab('none');player.points=new Decimal(0)}else{player.points=new Decimal(1e308)}}},
        {key: "0", description: "0", onPress(){if(Math.floor(player.k.mmm)%10!=0){layerDataReset("k");showTab('none');player.points=new Decimal(0)}else{player.points=new Decimal(1e308)}}},
    ],
    update(diff) {
		generatePoints("k", this.revenue(diff))
	},
    layerShown(){return true},
	clickables:{
    11:{
        display() {
            return "拾荒/开采"
        },
        unlocked(){return true},
        style(){return {"height":"125px"}},
        canClick(){return true},
        onClick(){
            if(player.k.didian==0){
                player.k.shuzhi=player.k.shuzhi.add(1)
                player.k.time=player.k.time.sub(1)
            }
            else if(player.k.didian==1){
                player.k.shitou=player.k.shitou.add(1)
                player.k.time=player.k.time.sub(2)
            }
            else if(player.k.didian==2){
                player.k.tie=player.k.tie.add(1)
                player.k.time=player.k.time.sub(3)
            }
            else{
                player.k.gu=player.k.gu.add(1)
                player.k.time=player.k.time.sub(4)
            }
        }
    },
    12:{
        display() {
            return "去森林<br>消耗1时间"
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
            return "制作木稿<br>消耗8树枝"
        },
        unlocked(){return true},
        style(){return {"height":"125px"}},
        canClick(){return player.k.shuzhi.gte(8)},
        onClick(){
            player.k.shuzhi=player.k.shuzhi.sub(8)
            player.k.sflag = new Decimal(1)
        }
    },
    14:{
        display() {
            return "去溪边<br>消耗1时间"
        },
        unlocked(){return player.k.sflag.gte(1)},
        style(){return {"height":"125px"}},
        canClick(){return true},
        onClick(){
            player.k.time=player.k.time.sub(1)
            player.k.didian=1
        }
    },
    15:{
        display() {
            return "制作石稿<br>消耗4树枝，4石头"
        },
        unlocked(){return true},
        style(){return {"height":"125px"}},
        canClick(){return player.k.shuzhi.gte(4)&&player.k.shitou.gte(4)},
        onClick(){
            player.k.shuzhi=player.k.shuzhi.sub(4)
            player.k.shitou=player.k.shitou.sub(4)
            player.k.tflag = new Decimal(1)
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
    22:{
        display() {
            return "去矿洞<br>消耗2时间"
        },
        unlocked(){return player.k.tflag.gte(1)},
        style(){return {"height":"125px"}},
        canClick(){return true},
        onClick(){
            player.k.time=player.k.time.sub(2)
            player.k.didian=2
        }
    },
    23:{
        display() {
            return "制作铁稿<br>消耗4树枝，2石头,3铁"
        },
        unlocked(){return player.k.tflag.gte(1)},
        style(){return {"height":"125px"}},
        canClick(){return player.k.shuzhi.gte(4)&&player.k.shitou.gte(2)&&player.k.tie.gte(3)},
        onClick(){
            player.k.shuzhi=player.k.shuzhi.sub(4)
            player.k.shitou=player.k.shitou.sub(2)
            player.k.tie=player.k.tie.sub(3)
            player.k.gflag = new Decimal(1)
        }
    },
    24:{
        display() {
            return "去高级矿洞<br>消耗3时间"
        },
        unlocked(){return player.k.gflag.gte(1)},
        style(){return {"height":"125px"}},
        canClick(){return true},
        onClick(){
            player.k.time=player.k.time.sub(3)
            player.k.didian=3
        }
    },
    25:{
        display() {
            return "制作超级自动采矿机<br>消耗5树枝，3石头,5铁,3钴金"
        },
        unlocked(){return player.k.gflag.gte(1)},
        style(){return {"height":"125px"}},
        canClick(){return player.k.shuzhi.gte(5)&&player.k.shitou.gte(3)&&player.k.tie.gte(5)&&player.k.gu.gte(3)},
        onClick(){
            player.k.shuzhi=player.k.shuzhi.sub(5)
            player.k.shitou=player.k.shitou.sub(3)
            player.k.tie=player.k.tie.sub(5)
            player.k.gu=player.k.gu.sub(3)
            player.k.wflag = new Decimal(1)
        }
    },
    26:{
        display() {
            return "制作计算机器<br>消耗5树枝，5石头,5铁，3钴金，4钨碳，30时间"
        },
        unlocked(){return player.k.wflag.gte(1)},
        style(){return {"height":"125px"}},
        canClick(){return player.k.shuzhi.gte(5)&&player.k.shitou.gte(5)&&player.k.tie.gte(5)&&player.k.gu.gte(3)&&player.k.wu.gte(3)&&player.k.time.gte(30)},
        onClick(){
            player.k.shuzhi=player.k.shuzhi.sub(5)
            player.k.shitou=player.k.shitou.sub(5)
            player.k.tie=player.k.tie.sub(5)
            player.k.gu=player.k.gu.sub(3)
            player.k.wu=player.k.wu.sub(3)
            player.k.zuizhong=player.k.zuizhong.add(2)
        }
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
                player.points=new Decimal(0)
            }
            else{
                player.k.daojishi=new Decimal(30)
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
                player.k.daojishi=new Decimal(30)
            }
            else{
                layerDataReset("k")
                player.points=new Decimal(0)
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
            ["display-text",
                function() { return '你有' + format(player.k.tie) + '铁'},
                { "color": "#DDDDDD", "font-size": "24px",}
            ],
            ["display-text",
                function() { return '你有' + format(player.k.gu) + '钴金'},
                { "color": "#00FF99", "font-size": "24px",}
            ],
            ["display-text",
                function() { return '你有' + format(player.k.wu) + '钨碳'},
                { "color": "#00FFFF", "font-size": "24px",}
            ],
            "blank",
            "blank",
            "blank",
            ["row",[["clickable", 11],["clickable", 12],["clickable", 13],["clickable", 14],["clickable", 15],["clickable", 22],["clickable", 23],["clickable", 24],["clickable", 25],["clickable", 26]]],
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
        player.k.jixie=player.k.jixie.sub(0.05)
        player.k.jiange=player.k.jiange.sub(0.025)
        player.k.daojishi=player.k.daojishi.sub(0.025)
        if(player.k.jiange<0){
            player.k.flag=1
            player.k.jiange=new Decimal(30)
        }
        if(player.k.daojishi<0){
            player.points=new Decimal(0)
            layerDataReset("k")
            showTab('none')
        }
        if(player.k.time<0){
            player.points=new Decimal(0)
            layerDataReset("k")
            showTab('none')
        }
        if(player.k.jixie<0){
            player.points=new Decimal(0)
            layerDataReset("k")
            showTab('none')
        }
        if(player.points<1e308){
            player.k.time=player.k.time.sub(0.003)
        }
        if(player.k.wflag==1){
            player.k.wu=player.k.wu.add(0.003)
        }
    },
})