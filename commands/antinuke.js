const Discord = require('discord.js');
const ms = require('ms');

const { OwnerId, Tester } = require('../config');
const { Client } = require('../index');

class EventsCalled
{
    constructor(name)
    {
        this.EventName = name;
        this.EventTriggered = 1;
    }
}

class CachedUser
{
    constructor(id, event)
    {
        this.Events = new Array();

        this.Id = id;
        this.Events.push(event);
    }
}

class Backup 
{
    /**
     * @param {Discord.Client} client 
     */
    constructor(client)
    {
        this.Roles = new Array();
        this.DeletedChannels = new Array();
        this.CreatedChannels = new Array();
        this.MembersLeft = new Array();

        this.Client = client;

        this.LimitSettings = {
            "MEMBER_KICK": {
                Limit: 5,
                Func: this.InformAboutRemovedMembers,
                Add: (member) => {
                    this.MembersLeft.push(member);
                }
            },
            "MEMBER_BAN_ADD": {
                Limit: 4,
                Func: this.InformAboutRemovedMembers,
                Add: (member) => {
                    this.MembersLeft.push(member);
                }
            },
            "CHANNEL_DELETE": {
                Limit: 1,
                Func: this.RecreateAllChannels,
                Add: (channel) => {
                    this.DeletedChannels.push(channel);
                }
            },
            "ROLE_DELETE": {
                Limit: 1,
                Func: this.RecreateAllRoles,
                Add: (role) => {
                    this.Roles.push(role);
                }
            },
            "CHANNEL_CREATE": {
                Limit: 1,
                Func: this.DeleteNewlyCreatedChannels,
                Add: (channel) => {
                    this.CreatedChannels.push(channel);
                }
            }
        };

        this.CachedUsers = new Array();
        this.RefreshTime = this.GetNewRefreshTime();

        this.RefreshBackup();
    }

    GetNewRefreshTime(offset = 3) { return new Date().setHours(new Date().getHours() + offset) };

    ResetBackup()
    {
        this.Roles = new Array();
        this.CreatedChannels = new Array();
        this.DeletedChannels = new Array();
        this.CachedUsers = new Array();

        this.RefreshTime = this.GetNewRefreshTime();
    }

    RefreshBackup()
    {
        setInterval(() => {
            if(Date.now() >= this.RefreshTime)
            {
                this.ResetBackup();
            }
        }, ms('5m'));
    }

    async RecreateRole(role)
    {
        const createdRole = await this.Client.guilds.first().createRole({
            name: role.name,
            color: role.color,
            permissions: role.permissions,
            hoist: role.hoist,
            mentionable: role.mentionable
        }, "Recreating role");

        return createdRole;
    }

    async RecreateAllRoles(id, actionFilter = null)
    {
        const roles = new Array();
        const rolesToIterate = TemporaryBackup.Roles.filter(r => r["ExecutorId"] === id);

        for(var i = 0; i < rolesToIterate.length; i++)
        {
            let role = rolesToIterate[i];

            roles.push(await Client.guilds.first().createRole({
                name: role.name,
                color: role.color,
                permissions: role.permissions,
                hoist: role.hoist,
                mentionable: role.mentionable
            }, "Recreating role"));
        }

        TemporaryBackup.DisablePermissions(id);
        return roles;
    }

    /**
     * @param {*} id 
     * @param {*} actionFilter 
     */
    async RecreateAllChannels(id, actionFilter = null)
    {
        const channels = new Array();
        const channelToIterate = TemporaryBackup.DeletedChannels.filter(c => c["ExecutorId"] === id && c.type !== "category");

        const parents = TemporaryBackup.DeletedChannels.filter(c => c.type === "category" && c["ExecutorId"] === id);
        if(parents.length > 0)
        {
            for(var i = 0; i < parents.length; i++)
            {
                let p = parents[i];

                await Client.guilds.first().createChannel(p.name, {
                    permissionOverwrites: p.permissionOverwrites,
                    type: "category"
                });
            }
        }

        const doesCategoryExist = (name) => Client.guilds.first().channels.find(c => c.type === "category" && c.name === name) ? true : false;

        for(var i = 0; i < channelToIterate.length; i++)
        {
            let channel = channelToIterate[i];

            channels.push(await Client.guilds.first().createChannel(channel.name, {
                permissionOverwrites: channel.permissionOverwrites,
                parent: channel.parent ? doesCategoryExist(channel.parent.name) ? Client.guilds.first().channels.find(c => c.name === channel.parent.name) : null : null,
                type: channel.type
            }));
        }

        TemporaryBackup.DisablePermissions(id);
        return channels;
    }

    async DeleteNewlyCreatedChannels(id, actionFilter = null)
    {
        const channels = new Array();
        const channelToIterate = TemporaryBackup.CreatedChannels.filter(c => c["ExecutorId"] === id);

        for(var i = 0; i < channelToIterate.length; i++)
        {
            let channel = channelToIterate[i];
            channels.push(channel);

            await channel.delete(`User created more than the max count of channels within the specified interval`);
        }

        TemporaryBackup.DisablePermissions(id);
        return channels;
    }

    InformAboutRemovedMembers(id, actionFilter)
    {
        const members = TemporaryBackup.MembersLeft.filter(m => m["ExecutorId"] === id && m["Action"] === actionFilter);

        const message = `Members were removed by: ${TemporaryBackup.GetMember(id).user.username} using the event: ${actionFilter}\n\n${members.map(m => `${m.user.username}/${m.id}`).join('\n')}`;

        TemporaryBackup.GetMember(OwnerId).send(message);
        TemporaryBackup.GetMember(Tester).send(message);

        TemporaryBackup.DisablePermissions(id);
        return members;
    }

    AddCachedUser(id, action, item)
    {
        if(id === Client.user.id)
        {
            return;
        }

        const user = this.CachedUsers.find(c => c.Id === id);
        if(user)
        {
            const event = user.Events.find(ev => ev.EventName === action);
            if(event)
            {
                ++event.EventTriggered;
            }
            else
            {
                user.Events.push(new EventsCalled(action));
            }
        }
        else
        {
            this.CachedUsers.push(new CachedUser(id, new EventsCalled(action)));
        }

        this.LimitSettings[action].Add ? this.LimitSettings[action].Add(item) : console.log("No add method assigned");
    }

    IsUserPastHisTriggers(id, action, item)
    {
        if(id === Client.user.id)
        {
            return false;
        }

        const user = this.CachedUsers.find(u => u.Id === id);
        if(!user)
        {
            return false;
        }

        const event = user.Events.find(ev => ev.EventName === action);
        if(!event)
        {
            return false;
        }

        if(event.EventTriggered + 1 <= this.LimitSettings[action].Limit)
        {
            return false;
        }
        
        this.LimitSettings[action].Add ? this.LimitSettings[action].Add(item) : console.log("No method specified to add new items to the cached array");
        this.LimitSettings[action].Func ? this.LimitSettings[action].Func(id, action) : console.log("No Func method assigned");

        return true;
    }

    DisablePermissions(id)
    {
        const member = this.Client.guilds.first().members.get(id);
        if(!member)
        {
            return;
        }

        console.log(`Removed role 'Administrator' from user: ${id}`);
        
        member.removeRoles(member.roles.map(r => r.id))
        .catch(console.error);

        this.CachedUsers.splice(this.CachedUsers.findIndex(u => u.Id === id), 1);

        this.RemoveUserFromAllEvent(this.Roles, id);
        this.RemoveUserFromAllEvent(this.CreatedChannels, id);
        this.RemoveUserFromAllEvent(this.DeletedChannels, id);
        this.RemoveUserFromAllEvent(this.MembersLeft, id);
    }

    RemoveUserFromAllEvent(arr, id)
    {
        const allIndexes = new Array();

        arr.forEach((field, index) => {
            if(field["ExecutorId"] === id)
            {
                allIndexes.push(index);
            }
        });

        for(var i = allIndexes.length - 1; i >= 0; i--)
        {
            arr.splice(i, 1);
        }
    }

    GetMember(id)
    {
        return this.Client.guilds.first().members.find(m => m.id === id);
    }
}

const TemporaryBackup = new Backup(Client);

module.exports = { TemporaryBackup };