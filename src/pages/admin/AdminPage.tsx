import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { HandHelping, UserRoundSearch, SearchX } from "lucide-react";

const NoResults = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
    <SearchX size={48} className="mb-2" />
    <span className="text-lg">{message}</span>
  </div>
);

const AdminPage = () => {
  // Fake data for donations
  const donations = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    donor: `Donor ${i + 1}`,
    amount: `$${(i + 1) * 10}`,
    date: `2025-06-${String(i + 1).padStart(2, "0")}`,
  }));

  // Fake data for people who joined
  const members = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Member ${i + 1}`,
    joinedDate: `2025-05-${String(i + 1).padStart(2, "0")}`,
  }));

  const [donationFilter, setDonationFilter] = useState("");
  const [memberFilter, setMemberFilter] = useState("");
  const [donationAmountFilter, setDonationAmountFilter] = useState("");
  const [joinedDateFilter, setJoinedDateFilter] = useState("");

  const filteredDonations = donations.filter((donation) => {
    const matchesDonor = donation.donor
      .toLowerCase()
      .includes(donationFilter.toLowerCase());
    const matchesAmount = donationAmountFilter
      ? parseInt(donation.amount.replace("$", "")) >
        parseInt(donationAmountFilter)
      : true;
    return matchesDonor && matchesAmount;
  });

  const filteredMembers = members.filter((member) => {
    const matchesName = member.name
      .toLowerCase()
      .includes(memberFilter.toLowerCase());
    const matchesDate = joinedDateFilter
      ? member.joinedDate === joinedDateFilter
      : true;
    return matchesName && matchesDate;
  });

  const totalDonations = donations.length;
  const totalMembers = members.length;

  return (
    <div className="p-6 pt-28">
      {/* Admin Dashboard */}
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-white p-4 shadow">
          <h2 className="text-lg font-semibold">Total Donations</h2>
          <p className="text-2xl font-bold">{totalDonations}</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow">
          <h2 className="text-lg font-semibold">Total Members</h2>
          <p className="text-2xl font-bold">{totalMembers}</p>
        </div>
      </div>

      <Tabs defaultValue="donations">
        <TabsList className="mb-3">
          <TabsTrigger value="donations" className="cursor-pointer">
            <HandHelping />
            Donations
          </TabsTrigger>
          <TabsTrigger value="members" className="cursor-pointer">
            <UserRoundSearch />
            Members
          </TabsTrigger>
        </TabsList>

        <TabsContent value="donations">
          {/* Donations Section */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">Donations</h2>
            <p className="mb-4">
              View and manage all donations made to the organization.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                placeholder="Filter by donor name"
                value={donationFilter}
                onChange={(e) => setDonationFilter(e.target.value)}
                className="mb-4 rounded border p-2"
              />
              <input
                type="number"
                placeholder="Filter by amount greater than"
                value={donationAmountFilter}
                onChange={(e) => setDonationAmountFilter(e.target.value)}
                className="mb-4 rounded border p-2"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <NoResults message="No donations found." />
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>{donation.id}</TableCell>
                      <TableCell>{donation.donor}</TableCell>
                      <TableCell>{donation.amount}</TableCell>
                      <TableCell>{donation.date}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </section>
        </TabsContent>

        <TabsContent value="members">
          {/* Members Section */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">People Who Joined</h2>
            <p className="mb-4">
              View and manage all people who joined the organization for the
              cause.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                placeholder="Filter by member name"
                value={memberFilter}
                onChange={(e) => setMemberFilter(e.target.value)}
                className="mb-4 rounded border p-2"
              />
              <select
                value={joinedDateFilter}
                onChange={(e) => setJoinedDateFilter(e.target.value)}
                className="mb-4 rounded border p-2"
              >
                <option value="">All joined dates</option>
                <option
                  value={new Date(Date.now() - 24 * 60 * 60 * 1000)
                    .toISOString()
                    .slice(0, 10)}
                >
                  Joined one day before
                </option>
                <option
                  value={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .slice(0, 10)}
                >
                  Joined a week before
                </option>
              </select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Joined Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <NoResults message="No members found." />
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.id}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.joinedDate}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
