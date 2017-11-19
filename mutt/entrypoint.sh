#!/bin/sh
set -e

if [ -z "$MAIL" ]; then
	echo >&2 'error: missing MAIL environment variable'
	echo >&2 '  try running again with -e MAIL=your-email@tld'
	echo >&2 '    optionally, you can also specify -e MAIL_PASS'
	echo >&2 '    -e MAIL_NAME="Your Name" and MAIL_FROM=email@your-domain.com'
	echo >&2 '      if not specified, both default to the value of GMAIL'
	exit 1
fi

if [ -z "$MAIL_NAME" ]; then
	MAIL_NAME="$MAIL"
fi

if [ -z "$GMAIL_FROM" ]; then
	GMAIL_FROM="$GMAIL"
fi

if [ -z "$IMAP_SERVER" ]; then
	IMAP_SERVER="mx.linuxlab.sh:993"
fi

if [ -z "$SMTP_SERVER" ]; then
	SMTP_SERVER="mx.linuxlab.sh"
fi

sed -i "s/%MAIL_LOGIN%/$MAIL/g"       "$HOME/.mutt/muttrc"
sed -i "s/%MAIL_NAME%/$MAIL_NAME/g"   "$HOME/.mutt/muttrc"
sed -i "s/%MAIL_PASS%/$MAIL_PASS/g"   "$HOME/.mutt/muttrc"
sed -i "s/%MAIL_FROM%/$MAIL_FROM/g"   "$HOME/.mutt/muttrc"
sed -i "s/%IMAP_SERVER%/$IMAP_SERVER/g" "$HOME/.mutt/muttrc"
sed -i "s/%SMTP_SERVER%/$SMTP_SERVER/g" "$HOME/.mutt/muttrc"

if [ -d "$HOME/.gnupg" ]; then
	# sane gpg settings to be a good encryption
	# social citizen of the world
	{
		echo
		if [ -f "/etc/Muttrc.gpg.dist" ]; then
			echo 'source /etc/Muttrc.gpg.dist'
		fi
		if [ -f "/usr/share/doc/mutt/samples/gpg.rc" ]; then
			echo 'source /usr/share/doc/mutt/samples/gpg.rc'
		fi
		if [ -f "/usr/share/doc/mutt/examples/gpg.rc" ]; then
			echo 'source /usr/share/doc/mutt/examples/gpg.rc'
		fi
		if [[ ! -z "$GPG_ID" ]]; then
			echo "set pgp_sign_as = $GPG_ID"
		fi
		echo 'set crypt_replysign=yes'
		echo 'set crypt_replysignencrypted=yes'
		echo 'set crypt_verify_sig=yes'
		# auto encrypt replies to encrypted mail
		echo 'set pgp_replyencrypt=yes'
		# auto sign replies to signed mail
		echo 'set pgp_replysign=yes'
		# auto sign & encrypt to signed & encrypted mail
		echo 'set pgp_replysignencrypted=yes'
		# show which keys are no good anymore
		echo 'set pgp_show_unusable=no'
		# auto sign emails
		echo 'set pgp_autosign=yes'
	} >> "$HOME/.mutt/muttrc"
fi

if [ -e "$HOME/.muttrc.local" ]; then
	echo "source $HOME/.muttrc.local" >> "$HOME/.mutt/muttrc"
fi

exec "$@"
