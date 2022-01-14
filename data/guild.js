const schema = mongoose.Schema({
  guildID: String,
  ///user:String,
  prefix: { type: String, default: "Bo" },

  isPremium: {
    type: String,
    default: false
  },
  xp: {
    onoff: { type: String, default: "on" }
  },
  premium: {
    redeemedBy: {
      id: { type: String, default: null },
      tag: { type: String, default: null }
    },

    redeemedAt: { type: String, default: null },

    expiresAt: { type: String, default: null },

    plan: { type: String, default: null }
  },
  channels:{
    
    xp:{type: String, default:null}
  },
  whitelist: { type: Array, default: [] },
 
});
module.exports = mongoose.model("Guild", schema);
