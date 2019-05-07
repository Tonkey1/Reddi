module.exports = { 
    user:{ 
        email:{type:String,required:true},
        password:{type:String,required:true},
        name:{type:String,required:true},
        gender:{type:String,required:true},
        
        university:{type:String,required:false},
        contact:{type:String,required:true},
        type:{type:String,required:true},
        favorite:{type:Array,required:false},
        portraitPath:{type:String,required:false}
    },

    house:{
    	type:{type:String,required:true},
        guests:{type:String,required:true},
        size:{type:String,required:true},
        bed:{type:String,required:true},
        bath:{type:String,required:true},

    	title:{type:String, required:true},
        description:{type:String, required:false},
        picturePath:{type:Array, required:true},
        address:{type:String, required:true},

        tag:{type:Array,required:true},

        rent:{type:Number,required:false},
        availableDate:{type:Date, required:true},
        duration:{type:String, required:true},

        landloardName:{type:String,required:true},
        landloardContact:{type:String,required:true},
        Comment:{type:String,required:false}
    }
};