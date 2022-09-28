using System;
using System.Collections.Generic;
using System.Linq;
using ThirtyFriends.API.Models;

namespace ThirtyFriends.API.Utilities
{
    public interface IChatRandomiser { 
        List<GroupChatModel> GetRandomGroups(List<DetailModel> userIds, List<string> introStatements, int groupSize = 6);
    }
    public class ChatRandomiser: IChatRandomiser
    {
        public List<GroupChatModel> GetRandomGroups(List<DetailModel> userIds, List<string> introStatements, int groupSize = 6)
        {
            var rnd = new Random();
            var shuffledUsers = userIds.OrderBy(x => rnd.Next()).ToList();
            var groupSizes = FindGroupSizes(userIds.Count, groupSize);
            return PopulateGroups(groupSizes, shuffledUsers, introStatements);
        }
        private List<GroupChatModel> PopulateGroups(List<int> groupSizes, List<DetailModel> userGroups, List<string> introStatements)
        {
            var groupChatList = new List<GroupChatModel>();
            List<int[]> groups = new List<int[]>();
            var skip = 0;
            groupSizes.ForEach(x =>
            {
                var groupChatModel = new GroupChatModel
                {
                    GroupName = Guid.NewGuid().ToString(),
                    Intros = introStatements,
                    Participants = userGroups.Skip(skip).Take(x).ToList()
                };
                skip += x;
                groupChatList.Add(groupChatModel);
            });
            return groupChatList;
        }
        private List<int> FindGroupSizes(int amount, int maxPerGroup)
        {
            int amountGroups = amount / maxPerGroup;
            if (amountGroups * maxPerGroup < amount)
            {
                amountGroups++;
            }
            int groupsLeft = amountGroups;
            List<int> result = new List<int>();
            while (amount > 0)
            {
                int nextGroupValue = amount / groupsLeft;
                if (nextGroupValue * groupsLeft < amount)
                {
                    nextGroupValue++;
                }
                result.Add(nextGroupValue);
                groupsLeft--;
                amount -= nextGroupValue;
            }
            return result;
        }
    }
}
