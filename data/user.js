const schema = mongoose.Schema({
  userID: String,
  name: { type: String},
  info: { type: String, default:null},

    
  isPremium: {
    type:String,
  
    default: false
  },
  premium: {
  
  redeemedBy: {
     id: {type: String, default: null},
     tag: {type:String, default: null},
  },

  redeemedAt: {type: String, default: null},

  expiresAt: {type: String, default: null},

  plan: {type: String, default: null},
  
  },
  birthdate: { type: Number }, // Birthdate of the user (the timestamp)
  money: { type: Number, default: 0 },
  time: { type: Number, default: 0 },
  lover: { type: String }, // The person with whom the user is in a relationship
  time1: { type: Number, default: 0 },
  levels: { type: Number, default: 1 },
  xp: { type: Number, default: 1 },
  inventory: { type: Array, default: [] },

  achievements: {
    type: Object,
    default: {
      married: {
        achieved: false,
        progress: {
          now: 0,
          total: 1
        }
      }
    }
  },

  data: {
    tips: {
      given: { type: Number, default: 0 },
      received: { type: Number, default: 0 },
      timestamp: { type: Number, default: 0 }
    },

    global_xp: { type: Number, default: 0 },
    xp: { type: Array, default: [] },
    
    global_level: { type: Number, default: 1 }
  },

  attch: {
    pattern: { type: String, default: null },
    emblem: { type: String, default: null },
    color: { type: String, default: "#FF0F00" },
    background: { type: String, default: null },
    hat: { type: String, default: null },
    wreath: { type: String, default: null }
  }
});
module.exports = mongoose.model("User", schema);
