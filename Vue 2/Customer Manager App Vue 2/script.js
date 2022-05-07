var customerManager=new Vue({
    data:{
        ismain:true,
        isadding:false,
        searched:'',
        firstname:'',
        lastname:'',
        email:'',
        phone:'',
        address:'',
        isdata:false,
        currentview:0,
        updateindex:-1,
        action:'Add',
        addedalert:false,
        updatealert:false,
        deletedalert:false,
        warnalert:false,
        datas:[
            {firstname:'John', lastname:'Doe', email:'johndoe@email.com', phone:'08573923093', address:'Helen Road, Maryland, USA', show:true},
            {firstname:'Snoopy', lastname:'Dog', email:'dogsnoopy@email.com', phone:'038814536589', address:'Moscow Road, Moscow, Russia', show:true},
            {firstname:'Bob', lastname:'Smurfy', email:'bobsmurfy@email.com', phone:'029673851157', address:'Cambridge Avenue, Cambridge, UK', show:true},
            {firstname:'Tom', lastname:'Cruise', email:'tomcruise24@email.com', phone:'08573923093', address:'McArthur Valley, Dublin, Ireland', show:true},
            {firstname:'Ciro', lastname:'Mudrosili', email:'ciro212@email.com', phone:'04829918413', address:'Dragav Main Street, Tashkent, Uzbekistan', show:true}
        ],

    },
    methods:{
        filter:function(){
            var searched=this.searched.toLowerCase().trim();
           this.datas.map((data, index)=>{
               var values=Object.values(data);
               var boolean=[];
               var index=0; var length=2;
               while(length>=index){
                var str=values[index];
                if(str.toLowerCase().includes(searched)){boolean.push(true)}else{boolean.push(false)};
                index++;
               }
              if(!boolean.includes(true)){data.show=false}else{data.show=true};
           })
        },
        submitinfo:function(){
           if(!this.firstname || !this.lastname || !this.email){
               this.warnalert=true;
           } else {
            var index=this.updateindex>-1?this.updateindex:this.datas.length;
            this.warnalert=false;
            add({
                firstname:this.firstname, lastname:this.lastname, email:this.email, phone:this.phone, address:this.address, show:true
            },index)
            this.firstname=''; this.lastname=''; this.email=''; this.phone='', this.address='';
            if(this.updateindex>-1){this.updatealert=true; setTimeout(()=>this.updatealert=false, 1500);}
            else{this.addedalert=true; setTimeout(()=>this.addedalert=false, 1500);}
            this.updateindex=-1;
            this.goback();
           }
        },
        toadd:function(){
            this.ismain=false;
            this.isadding=true;
            this.isdata=false;
            this.action='Add';
            this.firstname=''; this.lastname=''; this.email=''; this.phone='', this.address=''; this.updateindex=-1;
            this.warnalert=false;
        },
        goback:function(){
            this.isadding=false;
            this.ismain=true;
            this.isdata=false;
            this.updateindex=-1;
            this.warnalert=false;
        },
        setview:function(index){
            this.currentview=index;
            this.isdata=true;
            this.ismain=false;
            this.isadding=false;
        },
        deletedata:function(index){
            this.datas.splice(index,1);
            this.goback();
            this.deletedalert=true;
            setTimeout(()=>this.deletedalert=false, 1500);
        },
        editdata:function(index){
            var data=this.datas[index];
            this.firstname=data.firstname; this.lastname=data.lastname; this.email=data.email; this.phone=data.phone; this.address=data.address;
            this.updateindex=index;
            this.ismain=false;
            this.isadding=true;
            this.isdata=false;
            this.action='Edit';
        }
    },
}).$mount('#customer-manager');

function add(obj, length){
    Vue.set(customerManager.datas, length, obj);
}