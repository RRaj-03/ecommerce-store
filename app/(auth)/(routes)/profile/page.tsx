import { Separator } from "@/components/ui/separator";
import { AccountForm } from "./components/account-form";
import { auth } from "@/actions/getAuth";

export default async function Profile() {
	const { userId, firstName, lastName, email, image } = await auth();
	const user = {
		firstName,
		lastName,
		email,
		image,
		id: userId,
	};
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Account</h3>
				<p className="text-sm text-muted-foreground">
					Update your account settings. Set your preferred language and
					timezone.
				</p>
			</div>
			<Separator />
			<AccountForm
				user={{ ...user, image: { url: user?.image ? user.image.url : "" } }}
			/>
		</div>
	);
}
