Meteor.methods({
    createThread: function(topicId, content){
        check(topicId, String);
        check(content, String);
        var user = Meteor.user();
        if (!user) {
            throw new Meteor.Error("Nejste přihlášen");
        }
        if (!content){
            throw new Meteor.Error("Titulek tématu nesmí být prázdný");
        }
        var thread = {
            author: user.emails[0].address,
            createdAt: new Date(),
            topicId: topicId,
            content: content
        };
        return Threads.insert(thread);
    },
    
    createPost: function(threadId, content){
        check(threadId, String);
        check(content, String);
        var user = Meteor.user();
        if (!user) {
            throw new Meteor.Error("Nejste přihlášen");
        }
        if (!content) {
            throw new Meteor.Error("Obsah příspěvku nesmí být prázdný");
        }
        var post = {
            author: user.emails[0].address,
            createdAt: new Date(),
            threadId: threadId,
            content: content
        };
        return Posts.insert(post);
    }    
});